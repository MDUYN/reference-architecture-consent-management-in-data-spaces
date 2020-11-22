import os
import logging
from enum import Enum
from typing import Any
from flask import request
from math import ceil

from sqlalchemy import create_engine
from sqlalchemy.orm import Query, class_mapper, sessionmaker, scoped_session, \
    Session
from sqlalchemy.orm.exc import UnmappedClassError
from sqlalchemy.ext.declarative import declarative_base, declared_attr
from sqlalchemy.orm.exc import DetachedInstanceError
from sqlalchemy.exc import DatabaseError

from app.exceptions import OperationalException, ApiException
from app.configuration.constants import DATABASE_NAME, DATABASE_TYPE, \
    DATABASE_DIRECTORY_PATH, DATABASE_URL, DATABASE_USERNAME, DATABASE_HOST, \
    DATABASE_PASSWORD

logger = logging.getLogger(__name__)


class DatabaseType(Enum):
    """
    Class TimeUnit: Enum for TimeUnit
    """

    SQLITE3 = 'SQLITE3',
    POSTGRESQL = 'POSTGRESQL'

    # Static factory method to convert a string to time_unit
    @staticmethod
    def from_string(value: str):

        if isinstance(value, str):

            if value.lower() in ('sqlite', 'sqlite3'):
                return DatabaseType.SQLITE3

            elif value.lower() in ('postgresql', 'postgres'):
                return DatabaseType.POSTGRESQL
            else:
                raise OperationalException(
                    'Could not convert value {} to a data base type'.format(
                        value
                    )
                )

        else:
            raise OperationalException(
                "Could not convert non string value to a data base type"
            )

    def equals(self, other):

        if isinstance(other, Enum):
            return self.value == other.value
        else:

            try:
                data_base_type = DatabaseType.from_string(other)
                return data_base_type == self
            except OperationalException:
                pass

            return other == self.value


class Pagination:

    def __init__(self, query, page, per_page, total, items):
        #: the unlimited query object that was used to create this
        #: pagination object.
        self.query = query
        #: the current page number (1 indexed)
        self.page = page
        #: the number of items to be displayed on a page.
        self.per_page = per_page
        #: the total number of items matching the query
        self.total = total
        #: the items for the current page
        self.items = items

    @property
    def pages(self):
        """The total number of pages"""
        if self.per_page == 0 or self.total is None:
            pages = 0
        else:
            pages = int(ceil(self.total / float(self.per_page)))
        return pages

    def prev(self, error_out=False):
        """Returns a :class:`Pagination` object for the previous page."""
        assert (
                self.query is not None
        ), "a query object is required for this method to work"
        return self.query.paginate(self.page - 1, self.per_page, error_out)

    @property
    def prev_num(self):
        """Number of the previous page."""
        if not self.has_prev:
            return None
        return self.page - 1

    @property
    def has_prev(self):
        """True if a previous page exists"""
        return self.page > 1

    def next(self, error_out=False):
        """Returns a :class:`Pagination` object for the next page."""
        assert (
                self.query is not None
        ), "a query object is required for this method to work"
        return self.query.paginate(self.page + 1, self.per_page, error_out)

    @property
    def has_next(self):
        """True if a next page exists."""
        return self.page < self.pages

    @property
    def next_num(self):
        """Number of the next page"""
        if not self.has_next:
            return None
        return self.page + 1

    def iter_pages(
            self,
            left_edge=2,
            left_current=2,
            right_current=5,
            right_edge=2
    ):
        last = 0
        for num in range(1, self.pages + 1):
            if (
                    num <= left_edge
                    or (
                    num > self.page - left_current - 1
                    and num < self.page + right_current
            )
                    or num > self.pages - right_edge
            ):
                if last + 1 != num:
                    yield None
                yield num
                last = num


class DatabaseOperationalException(Exception):
    """
    Class DatabaseOperationalException: Exception class indicating a problem
    occurred during usage of the database
    """
    def __init__(self, message) -> None:
        super(DatabaseOperationalException, self).__init__(message)


class _SessionProperty:
    """
    Wrapper for session property of a Model
    To make sure that each thread gets an scoped session, a new scoped
    session is created if a new thread accesses the session property of
    a Model.
    """
    def __init__(self, db):
        self.db = db

    def __get__(self, instance, owner):
        return self.db.session


class _QueryProperty:
    """
    Wrapper for query property of a Model
    This wrapper makes sure that each model gets a Query object with a
    correct session corresponding to its thread.
    """
    def __init__(self, db):
        self.db = db

    def __get__(self, instance, owner):

        try:
            mapper = class_mapper(owner)
            if mapper:
                return owner.query_class(mapper, session=self.db.session)

        except UnmappedClassError:
            return None


class Model:
    """
    Standard SQL alchemy model
    This model is thread safe
    """
    table_name = None
    session = None

    # Needed for query property
    query_class = None
    _query = None

    @property
    def query(self) -> Query:
        return self._query

    @declared_attr
    def __tablename__(cls):

        if cls.table_name is None:
            return cls.__name__.lower()
        return cls.table_name

    def save(self):
        self.session.add(self)
        self._flush()
        return self

    def update(self, **kwargs):

        for attr, value in kwargs.items():
            setattr(self, attr, value)
        return self.save()

    def delete(self):
        self.session.delete(self)
        self._flush()

    def _flush(self):
        try:
            self.session.flush()
        except DatabaseError:
            self.session.rollback()
            raise

    def repr(self, **fields: Any) -> str:
        """
        Helper for __repr__
        """

        field_strings = []
        at_least_one_attached_attribute = False

        for key, field in fields.items():

            try:
                field_strings.append(f'{key}={field!r}')
            except DetachedInstanceError:
                field_strings.append(f'{key}=DetachedInstanceError')
            else:
                at_least_one_attached_attribute = True

        if at_least_one_attached_attribute:
            return f"<{self.__class__.__name__}({','.join(field_strings)})>"

        return f"<{self.__class__.__name__} {id(self)}>"


class BaseQuery(Query):

    def first_or_404(self, error_message=None):
        rv = self.first()
        if rv is None:
            raise ApiException(message=error_message, status_code=404)
        return rv

    def paginate(
            self, page: int = None, per_page: int = None, throw_api_exception=False
    ):

        if request:
            if page is None:
                try:
                    page = int(request.args.get("page", 1))
                except (TypeError, ValueError):
                    if throw_api_exception:
                        raise ApiException(
                            status_code=400,
                            message="Given page does not exist"
                        )

                    page = 1

            if per_page is None:
                try:
                    per_page = int(request.args.get("per_page", 20))
                except (TypeError, ValueError):
                    if throw_api_exception:
                        raise ApiException(
                            status_code=400,
                            message="Given per page value does not exist"
                        )

                    per_page = 20
        else:
            if page is None:
                page = 1

            if per_page is None:
                per_page = 20

        if page < 1:
            if throw_api_exception:
                raise ApiException(
                    status_code=400,
                    message="Page value is negative"
                )
            else:
                page = 1

        if per_page < 0:
            if throw_api_exception:
                raise ApiException(
                    status_code=400,
                    message="Per page value is negative"
                )
            else:
                per_page = 20

        items = self.limit(per_page).offset((page - 1) * per_page).all()

        if not items and page != 1 and throw_api_exception:
            raise ApiException(
                status_code=400,
                message="No values"
            )

        total = self.order_by(None).count()
        return Pagination(self, page, per_page, total, items)


class SQLAlchemyDatabaseResolver:

    def __init__(self, query_class=BaseQuery, model_class=Model) -> None:
        self._configured = False
        self.Query = query_class
        self.engine = None
        self.session_factory = None
        self.Session = None
        self._model = self.make_declarative_base(model_class)
        self.config = {}

    @staticmethod
    def make_declarative_base(model_class):
        """
        Creates the declarative base that all models will inherit from.
        """

        return declarative_base(cls=model_class)

    @property
    def session(self) -> Session:
        """
        Returns scoped session of an Session object
        """
        return self.Session()

    @property
    def Model(self):
        return self._model

    def initialize_tables(self):
        self._model.metadata.create_all(self.engine)

    def connect_postgresql(
            self, database_config=None, url=None, ssl_require: bool = False
    ):

        if url is not None:
            self.config[DATABASE_TYPE] = DatabaseType.POSTGRESQL
            self.config[DATABASE_URL] = url
        else:
            # Try to get all required configuration properties
            try:
                self.config[DATABASE_URL] = 'postgresql://{}:{}@{}/{}'.format(
                    database_config[DATABASE_USERNAME],
                    database_config[DATABASE_PASSWORD],
                    database_config[DATABASE_HOST],
                    database_config[DATABASE_NAME]
                )
                self.config[DATABASE_TYPE] = DatabaseType.POSTGRESQL
            except Exception as e:
                logger.error(e)
                raise DatabaseOperationalException(
                    "Missing configuration settings for sqlite3. For sqlite3 "
                    "the following attributes are needed: "
                    "DATABASE_DIRECTORY_PATH, DATABASE_NAME"
                )

        if DATABASE_URL not in self.config:
            raise DatabaseOperationalException("No database url configured")

        self.initialize_engine(
            self.config[DATABASE_URL],
            ssl_require=ssl_require
        )
        self.initialize_session()
        self.initialize_model()

        logger.info(
            "Database resolver connected to postgresql database instance"
        )

    def connect_sqlite(self, database_config):

        # Try to get all required configuration properties
        try:
            self.config[DATABASE_NAME] = database_config[DATABASE_NAME]
            self.config[DATABASE_DIRECTORY_PATH] = database_config[
                DATABASE_DIRECTORY_PATH
            ]
            self.config[DATABASE_TYPE] = DatabaseType.SQLITE3
        except Exception as e:
            logger.error(e)
            raise DatabaseOperationalException(
                "Missing configuration settings for sqlite3. For sqlite3 the "
                "following attributes are needed: DATABASE_DIRECTORY_PATH, "
                "DATABASE_NAME"
            )

        if not os.path.isdir(self.config[DATABASE_DIRECTORY_PATH]):
            raise DatabaseOperationalException(
                "Give sqlite3 destination directory does not exist for "
                "director path: {}".format(
                    self.config[DATABASE_DIRECTORY_PATH]
                )
            )

        database_path = os.path.join(
            self.config[DATABASE_DIRECTORY_PATH],
            self.config[DATABASE_NAME] + '.sqlite3'
        )

        if not os.path.isfile(database_path):
            open(database_path, 'w').close()

        self.config[DATABASE_URL] = 'sqlite:////{}'.format(database_path)
        self.initialize_engine(self.config[DATABASE_URL])
        self.initialize_session()
        self.initialize_model()

        logger.info(
            "Database resolver connected to sqlite database instance"
        )

    def initialize_engine(self, database_url, ssl_require: bool = False):

        if ssl_require:
            self.engine = create_engine(
                database_url,
                connect_args={'sslmode': 'require'}
            )
        else:
            self.engine = create_engine(database_url)

    def initialize_session(self):

        # Initialize Session object
        self.session_factory = sessionmaker(bind=self.engine)
        self.Session = scoped_session(self.session_factory)

    def initialize_model(self):
        if self._model is None:
            raise DatabaseOperationalException("Model is not defined")

        self._model.session = _SessionProperty(self)

        if not getattr(self._model, 'query_class', None):
            self._model.query_class = self.Query

        self._model.query = _QueryProperty(self)

    def configure_with_url(self, url: str) -> None:
        self.engine = create_engine(url)

    @property
    def metadata(self):
        return self.Model.metadata
