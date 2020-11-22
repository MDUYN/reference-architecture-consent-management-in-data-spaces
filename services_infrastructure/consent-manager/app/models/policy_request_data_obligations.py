from sqlalchemy import Column, Integer, String, ForeignKey, \
    Enum as SQLAlchemyEnum
from sqlalchemy.orm import relationship

from app.models.data_category import DataCategory
from app.extensions import db


class PolicyRequestDataObligation(db.Model):

    table_name = 'policy_request_data_obligations'
    id = Column(Integer, primary_key=True)
    attribute_id = Column(String)
    attribute_constraint = Column(String)

    policy_request_id = Column(String, ForeignKey('policy_requests.id'))
    policy_request = relationship(
        'PolicyRequest', back_populates="request_data_obligations"
    )

    def __repr__(self):
        return self._repr(
            id=self.id,
            attribute_id=self.attribute_id,
            attribute_constraint=self.attribute_constraint
        )
