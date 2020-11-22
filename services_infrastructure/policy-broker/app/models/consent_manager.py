from sqlalchemy import Column, String
from uuid import uuid4

from app.extensions import db


class ConsentManager(db.Model):
    table_name = 'consent_managers'

    id = Column(String, default=str(uuid4()), primary_key=True)

    def __repr__(self):
        return self.repr(id=self.id)
