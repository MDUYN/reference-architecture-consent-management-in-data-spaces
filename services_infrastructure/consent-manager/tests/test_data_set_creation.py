import json
from uuid import uuid4
from tests import TestBase
from app.models import DataOwner, DataProvider, DataCategory, DataSet


class TestDataProviderCreation(TestBase):

    def setUp(self) -> None:
        super(TestDataProviderCreation, self).setUp()
        self.data_provider = DataProvider(data_provider_id=str(uuid4()))
        self.data_provider.save()

        data_owner_one = DataOwner(data_owner_id=str(uuid4()))
        data_owner_one.save()

        data_owner_two = DataOwner(data_owner_id=str(uuid4()))
        data_owner_two.save()

        self.data_set_data = {
            'id': str(uuid4()),
            'data_owners': [data_owner_one.id, data_owner_two.id],
            'data_category': DataCategory.energy_generation_data.value
        }

    def test_creation(self):
        response = self.client.post(
            '/{}/data-sets'.format(self.data_provider.id),
            data=json.dumps(self.data_set_data),
            content_type='application/json',
        )
        data = json.loads(response.data.decode())
        self.assertEqual(response.status_code, 201)
        self.assertEqual(data['id'], self.data_set_data.get('id'))
        self.assertEqual(len(DataSet.query.all()), 1)
