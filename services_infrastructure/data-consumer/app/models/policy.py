from sqlalchemy import Column, String, Integer
from uuid import uuid4

from app.extensions import db


class Policy(db.Model):
    table_name = 'policies'

    id = Column(String, default=str(uuid4()), primary_key=True)

    def __repr__(self):
        return self.repr(id=self.id)
