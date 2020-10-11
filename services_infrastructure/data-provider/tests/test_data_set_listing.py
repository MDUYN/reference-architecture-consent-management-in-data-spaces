import json
from uuid import uuid4
from tests import TestBase
from app.models import DataSet, DataCategory, DataOwner
from app.extensions import db


class TestDataSetCreation(TestBase):

    def setUp(self) -> None:
        super(TestDataSetCreation, self).setUp()

    def test_listing(self):
        response = self.client.get(
            '/data-sets', content_type='application/json'
        )

        data = json.loads(response.data.decode())
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(data), len(DataSet.query.all()))

        data_set = DataSet(
            data_set_id=str(uuid4()),
            data_category=DataCategory.energy_generation_data
        )
        data_owner_one = DataOwner(data_owner_id=str(uuid4()))
        data_owner_two = DataOwner(data_owner_id=str(uuid4()))
        data_set.data_owners.append(data_owner_one)
        data_set.data_owners.append(data_owner_two)
        data_set.save()
        db.session.commit()

        data_set = DataSet(
            data_set_id=str(uuid4()),
            data_category=DataCategory.energy_storage_data
        )
        data_owner_one = DataOwner(data_owner_id=str(uuid4()))
        data_owner_two = DataOwner(data_owner_id=str(uuid4()))
        data_set.data_owners.append(data_owner_one)
        data_set.data_owners.append(data_owner_two)
        data_set.save()
        db.session.commit()

        response = self.client.get(
            '/data-sets', content_type='application/json'
        )

        data = json.loads(response.data.decode())
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(data), len(DataSet.query.all()))
