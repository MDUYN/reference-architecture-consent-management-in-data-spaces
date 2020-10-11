import json
from uuid import uuid4
from tests import TestBase
from app.models import DataOwner, DataSet


class TestDataSetCreation(TestBase):

    def setUp(self) -> None:
        super(TestDataSetCreation, self).setUp()
        data_owner_one = DataOwner(data_owner_id=str(uuid4()))
        data_owner_two = DataOwner(data_owner_id=str(uuid4()))
        data_owner_one.save()
        data_owner_two.save()

        self.data_sets_data = {
            'id': str(uuid4()),
            'data_category': 'energy_usage_data',
            'data_owners': [data_owner_one.id, data_owner_two.id]
        }

    def test_creation(self):
        response = self.client.post(
            '/data-sets',
            data=json.dumps(self.data_sets_data),
            content_type='application/json',
        )

        data = json.loads(response.data.decode())
        self.assertEqual(response.status_code, 201)
        self.assertEqual(data['id'], self.data_sets_data.get('id'))
        self.assertEqual(
            data['data_category'], self.data_sets_data.get('data_category')
        )

        data_set = DataSet.query.filter_by(
            id=self.data_sets_data['id']
        ).first()

        assert len(data_set.data_owners) == 2