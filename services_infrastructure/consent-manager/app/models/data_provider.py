from sqlalchemy import Column, String
from sqlalchemy.orm import relationship

from app.extensions import db


class DataProvider(db.Model):
    """
    Class DataProvider: a database model for an Data Provider instance.

    Attributes:
    A Data Provider instance consists out of the following attributes:

    - id: string of an data owner id.
    - data sets: all the data sets that belong to the data provider.

    Known issues

    UUID is difficult to map different types of data bases. Therefore it
    is used as a string.
    """

    table_name = 'data_providers'
    id = Column(String, primary_key=True)
    data_sets = relationship("DataSet", back_populates="data_provider")

    def __init__(self, data_provider_id: str, **kwargs):
        self.id = data_provider_id
        super(DataProvider, self).__init__()

    def __repr__(self):
        return self._repr(id=self.id)
