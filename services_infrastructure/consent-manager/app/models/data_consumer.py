from sqlalchemy import Column, String
from sqlalchemy.orm import relationship

from app.extensions import db


class DataConsumer(db.Model):
    table_name = 'data_consumers'
    id = Column(String, primary_key=True)


    def __repr__(self):
        return self._repr(id=self.id)
