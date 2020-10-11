import json
import unittest
from uuid import uuid4
from tests import TestBase, random_string
from app.models import DataOwner, DataObligation, DataSet, DataPermission, DataCategory
from app.extensions import db
import testing.postgresql
from app.services.policy_former import PolicyFormer


class TestDataPermissionListing(unittest.TestCase):

    def setUp(self) -> None:
        self.postgresql = testing.postgresql.Postgresql()
        db.configure(database_url=self.postgresql.url())
        db.initialize_tables()

        self.data_owner = DataOwner(data_owner_id=str(uuid4()))
        self.data_owner.save()

        data_obligation = DataObligation(
            attribute_id=random_string(10),
            attribute_constraint=random_string(10),
            data_category=DataCategory.energy_storage_data
        )
        data_obligation.data_owner = self.data_owner
        data_obligation.save()

        data_obligation = DataObligation(
            attribute_id=random_string(10),
            attribute_constraint=random_string(10),
            data_category=DataCategory.energy_storage_data
        )
        data_obligation.data_owner = self.data_owner
        data_obligation.save()

        data_permission = DataPermission(
            attribute_id=random_string(10),
            attribute_constraint=random_string(10),
            data_category=DataCategory.energy_storage_data
        )
        data_permission.data_owner = self.data_owner
        data_permission.save()

        data_permission = DataPermission(
            attribute_id=random_string(10),
            attribute_constraint=random_string(10),
            data_category=DataCategory.energy_storage_data
        )
        data_permission.data_owner = self.data_owner
        data_permission.save()

        self.data_set = DataSet(data_set_id=str(uuid4()), data_category=DataCategory.energy_storage_data)
        self.data_set.data_owners.append(self.data_owner)
        self.data_set.save()
        db.session.commit()

    def test_forming_policies(self):
        policy_former = PolicyFormer()
        policy_former.form_policy(self.data_set)