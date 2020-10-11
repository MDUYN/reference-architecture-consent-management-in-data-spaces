from sqlalchemy import Column, String, Integer, ForeignKey, \
    Enum as SQLAlchemyEnum, UniqueConstraint
from sqlalchemy.orm import relationship

from app.extensions import db
from app.models.data_category import DataCategory
from app.models.policy_data_permission_associations import policy_data_permission_association_table


class DataPermission(db.Model):

    table_name = 'data_permissions'
    id = Column(Integer, primary_key=True)
    data_owner_id = Column(String, ForeignKey('data_owners.id'))
    data_owner = relationship("DataOwner", back_populates='permissions')
    attribute_id = Column(String)
    attribute_constraint = Column(String)
    data_category = Column(SQLAlchemyEnum(DataCategory), nullable=False)
    policies = relationship(
        'Policy',
        secondary=policy_data_permission_association_table,
        cascade="all,delete",
        back_populates="permissions"
    )

    __table_args__ = (
        UniqueConstraint('data_owner_id', 'attribute_id', 'data_category'),
    )

    def __repr__(self):
        return self.repr(
            id=self.id,
            attribute_id=self.attribute_id,
            attribute_constraint=self.attribute_constraint
        )
