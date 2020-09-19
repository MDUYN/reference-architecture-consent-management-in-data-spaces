import enum
from sqlalchemy import Column, String, \
    Enum as SQLAlchemyEnum, ForeignKey
from sqlalchemy.orm import relationship

from app.extensions import db
from app.models.data_owner_data_set_association import \
    data_owner_data_set_association_table


class DataCategory(enum.Enum):
    energy_usage_data = 'energy_usage_data'
    energy_generation_data = 'energy_generation_data'
    energy_storage_data = 'energy_storage_data'


class DataSet(db.Model):
    """
    Class DataSet: a database model for an data set instance.

    Attributes:
    A Data Set instance consists out of the following attributes:

    - id: string of an data set id
    - data category: enum for a specific data category
    - data owners

    Known issues

    UUID is difficult to map different types of databases. Therefore it
    is used as a string.
    """

    table_name = 'data_sets'
    id = Column(String, primary_key=True)
    data_category = Column(SQLAlchemyEnum(DataCategory), nullable=False)
    data_owners = relationship(
        'DataOwner',
        secondary=data_owner_data_set_association_table,
        cascade="all,delete",
        back_populates='data_sets'
    )
    data_provider_id = Column(String, ForeignKey('data_providers.id'))
    data_provider = relationship("DataProvider", back_populates='data_sets')

    def __init__(self, data_set_id: str, data_category, **kwargs):
        self.id = data_set_id
        self.data_category = data_category
        super(DataSet, self).__init__(**kwargs)

    def __repr__(self):
        return self._repr(id=self.id, data_category=self.data_category)
