from sqlalchemy import Column, String
from sqlalchemy.orm import relationship

from app.extensions import db
from app.models.data_owner_data_set_association import \
    data_owner_data_set_association_table


class DataOwner(db.Model):
    """
    Class DataOwner: a database model for an Data Owner instance.

    Attributes:
    A Data Owner instance consists out of the following attributes:

    - id: string of an data owner id

    Known issues

    UUID is difficult to map different types of data bases. Therefore it
    is used as a string.
    """

    table_name = 'data_owners'
    id = Column(String, primary_key=True)
    data_sets = relationship(
        'DataSet',
        secondary=data_owner_data_set_association_table,
        cascade="all,delete",
        back_populates="data_owners"
    )

    permissions = relationship("DataPermission", back_populates="data_owner")
    obligations = relationship("DataObligation", back_populates="data_owner")

    def __init__(self, data_owner_id: str, **kwargs):
        self.id = data_owner_id
        super(DataOwner, self).__init__(**kwargs)

    def __repr__(self):
        return self.repr(id=self.id)
