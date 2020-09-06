import datetime
from typing import Any
from slugify import slugify
from sqlalchemy import Column, String, Integer, Boolean, DateTime
from sqlalchemy.orm import validates, relationship
from sqlalchemy_utils import EmailType, PasswordType

from app.extensions import db
from app.configuration.constants import MAX_LENGTH_SLUG, MAX_LENGTH_PASSWORD


class User(db.Model):
    """
    Class User: a database model for an User instance.

    Attributes:
    A User instance consists out of the following attributes:

    - id: integer
    - username: Unique name for the user.
    - registered_on: The datetime the user was created.
    - email: The email of the user
    - password: The password of the user
    - admin: Flag indicating the user is admin
    - profile: A reference to the UserProfile

    Relations:
    UserProfile deletes itself as a reaction on the cascade relation set
    by User.

    Known issues

    When updating the password attribute make sure to commit the database
    session, otherwise the password will not
    update. This has to do with the internal mechanism that creates the
    hash and inserts it into the database.
    """

    table_name = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(MAX_LENGTH_SLUG), unique=True, nullable=False)
    email = Column(EmailType, unique=True, nullable=False)
    registered_on = Column(DateTime, nullable=False)
    admin = Column(Boolean, nullable=False, default=False)
    password = Column(
        PasswordType(
            schemes=['pbkdf2_sha512'],
            max_length=MAX_LENGTH_PASSWORD
        ),
        nullable=False
    )

    # Relationships
    profile = relationship(
        'UserProfile',
        uselist=False,
        cascade="all,delete",
        back_populates="user"
    )

    def __init__(self, username: str, **kwargs):
        self.username = slugify(username)
        self.registered_on = datetime.datetime.now()

        super(User, self).__init__(**kwargs)

    @validates('id')
    def _validate_id(self, key, value) -> Any:
        existing = getattr(self, key)

        if existing is not None:
            raise ValueError("Id is write-once")
        return value

    @validates('username')
    def _validate_username(self, key, value) -> Any:
        existing = getattr(self, key)

        if existing is not None:
            raise ValueError("Username is write-once")

        if User.query.filter_by(username=value).first() is not None:
            raise ValueError("Username {} is already used".format(value))
        return value

    def __repr__(self):
        return self._repr(username=self.username, email=self.email)
