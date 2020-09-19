from sqlalchemy import Table, Column, String, ForeignKey
from app.extensions import db


data_owner_data_set_association_table = Table(
    'association',
    db.metadata,
    Column('data_owners_id', String, ForeignKey('data_owners.id')),
    Column('data_sets_id', String, ForeignKey('data_sets.id'))
)
