from sqlalchemy import Column, String
from uuid import uuid4

from app.extensions import db


class DataSet(db.Model):
    table_name = 'data_sets'

    id = Column(String, default=str(uuid4()), primary_key=True)

    def __repr__(self):
        return self.repr(id=self.id)
