from sqlalchemy import Column, String, Integer
from uuid import uuid4

from app.extensions import db


class Policy(db.Model):
    """
    Class Algorithm: a database model for an Algorithm instance.

    Attributes:
    A Algorithm instance consists out of the following attributes:

    - id: integer (internal usage).
    - dataProviderId:
    - dataSetId
    - dataConsumerId
    - policy


    During creation of a Algorithm, you need to provide a Developer instance.
    """

    table_name = 'policies'

    id = Column(String, default=str(uuid4()), primary_key=True)
    data_provider_id = Column(String)
    data_set_id = Column(String)
    data_consumer_id = Column(String)
    policy_content_path = Column(String)

    def __repr__(self):
        return self.repr(id=self.id)
