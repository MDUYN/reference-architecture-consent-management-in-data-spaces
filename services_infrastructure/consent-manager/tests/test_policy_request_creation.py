import json
from uuid import uuid4
from app.models import DataOwner, DataProvider, DataCategory, DataSet
from tests.resources import AppTestBase


class TestDataProviderCreation(AppTestBase):

    def setUp(self) -> None:
        super(TestDataProviderCreation, self).setUp()
        self.data_provider = DataProvider(data_provider_id=str(uuid4()))
        self.data_provider.save()

        data_owner_one = DataOwner(data_owner_id=str(uuid4()))
        data_owner_one.save()

        data_owner_two = DataOwner(data_owner_id=str(uuid4()))
        data_owner_two.save()
        self.data_set = DataSet(
            data_set_id=str(uuid4()),
            data_category=DataCategory.energy_generation_data,
            data_provider=self.data_provider
        )
        self.data_set.data_owners = [data_owner_one, data_owner_two]
        self.data_set.save()
        self.data_consumer = str(uuid4())

        self.test_data = {
            'data_consumer_id': self.data_consumer,
            'request_data_obligations': [
                {
                    'attribute_id': 'commercial_usage',
                    'attribute_constraint': 'true'
                }
            ],
            'request_data_permissions': [
                {
                    'attribute_id': 'commercial_usage',
                    'attribute_constraint': 'true'
                }
            ]
        }

    def test_creation(self):
        response = self.client.post(
            '/policy/{}/data-sets/{}'.format(
                self.data_provider.id, self.data_set.id
            ),
            data=json.dumps(self.test_data),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 201)
