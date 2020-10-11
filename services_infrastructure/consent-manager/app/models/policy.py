from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.models.policy_data_permission_associations \
    import policy_data_permission_association_table
from app.models.policy_data_obligation_associations \
    import policy_data_obligation_association_table
from app.extensions import db


class Policy(db.Model):

    table_name = 'policies'
    id = Column(Integer, primary_key=True)
    data_set_id = Column(String, ForeignKey('data_sets.id'))
    data_set = relationship("DataSet", back_populates='policies')
    data_consumer_id = Column(String, ForeignKey('data_consumers.id'))
    data_consumer = relationship("DataConsumer", back_populates='policies')
    permissions = relationship(
        'DataPermission',
        secondary=policy_data_permission_association_table,
        cascade="all,delete",
        back_populates='policies'
    )
    obligations = relationship(
        'DataObligation',
        secondary=policy_data_obligation_association_table,
        cascade="all,delete",
        back_populates='policies'
    )

    def __repr__(self):
        return self._repr(
            id=self.id,
        )
