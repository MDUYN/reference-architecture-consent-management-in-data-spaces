import json
from uuid import uuid4
from tests import TestBase, random_string
from app.models import DataOwner, DataPermission, DataCategory
from app.extensions import db


class TestDataPermissionListing(TestBase):

    def setUp(self) -> None:
        super(TestDataPermissionListing, self).setUp()
        self.data_owner = DataOwner(data_owner_id=str(uuid4()))
        self.data_owner.save()

        data_permission = DataPermission(
            attribute_id=random_string(10),
            attribute_constraint=random_string(10),
            data_category=DataCategory.energy_usage_data
        )
        data_permission.data_owner = self.data_owner
        data_permission.save()

        data_permission = DataPermission(
            attribute_id=random_string(10),
            attribute_constraint=random_string(10),
            data_category=DataCategory.energy_usage_data
        )
        data_permission.data_owner = self.data_owner
        data_permission.save()
        db.session.commit()

    def test_listing(self):
        response = self.client.get(
            '/data-owners/{}/data-permissions/{}'.format(
                self.data_owner.id, DataCategory.energy_usage_data.value
            ),
            content_type='application/json',
        )
        data = json.loads(response.data.decode())

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(data), 2)
