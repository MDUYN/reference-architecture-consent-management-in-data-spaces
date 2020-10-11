from sqlalchemy import Table, Column, String, ForeignKey, Integer
from app.extensions import db


policy_data_obligation_association_table = Table(
    'policy_data_obligation_association',
    db.metadata,
    Column('policy_id', Integer, ForeignKey('policies.id')),
    Column('data_obligation_id', Integer, ForeignKey('data_obligations.id'))
)
