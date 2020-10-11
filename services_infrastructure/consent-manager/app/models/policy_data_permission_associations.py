from sqlalchemy import Table, Column, ForeignKey, Integer
from app.extensions import db


policy_data_permission_association_table = Table(
    'policy_data_permission_association',
    db.metadata,
    Column('policy_id', Integer, ForeignKey('policies.id')),
    Column('data_permission_id', Integer, ForeignKey('data_permissions.id'))
)
