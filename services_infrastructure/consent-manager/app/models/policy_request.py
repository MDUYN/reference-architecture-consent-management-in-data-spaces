from uuid import uuid4
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.extensions import db


class PolicyRequest(db.Model):

    table_name = 'policy_requests'

    id = Column(String, default=str(uuid4()), primary_key=True)
    data_set_id = Column(String)
    data_consumer_id = Column(String)
    request_data_permissions = relationship(
        'PolicyRequestDataPermission',
        back_populates='policy_request'
    )
    request_data_obligations = relationship(
        'PolicyRequestDataObligation',
        back_populates='policy_request'
    )

    def __repr__(self):
        return self.repr(
            id=self.id,
        )
