from sqlalchemy import Column, Integer, String, ForeignKey, \
    Enum as SQLAlchemyEnum, UniqueConstraint
from sqlalchemy.orm import relationship

from app.models.data_category import DataCategory
from app.extensions import db
from app.models.policy_data_obligation_associations \
    import policy_data_obligation_association_table


class DataObligation(db.Model):

    table_name = 'data_obligations'
    id = Column(Integer, primary_key=True)
    data_owner_id = Column(String, ForeignKey('data_owners.id'))
    data_owner = relationship("DataOwner", back_populates='obligations')
    attribute_id = Column(String)
    attribute_constraint = Column(String)
    data_category = Column(SQLAlchemyEnum(DataCategory), nullable=False)
    policies = relationship(
        'Policy',
        secondary=policy_data_obligation_association_table,
        cascade="all,delete",
        back_populates="obligations"
    )

    __table_args__ = (
        UniqueConstraint('data_owner_id', 'attribute_id', 'data_category'),
    )

    def __repr__(self):
        return self._repr(
            id=self.id,
            attribute_id=self.attribute_id,
            attribute_constraint=self.attribute_constraint
        )
