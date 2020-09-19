import json
from uuid import uuid4
from tests import TestBase


class TestDataProviderCreation(TestBase):

    def setUp(self) -> None:
        super(TestDataProviderCreation, self).setUp()
        self.data_provider_data = {
            'id': str(uuid4()),
        }

    def test_creation(self):
        response = self.client.post(
            '/data-providers',
            data=json.dumps(self.data_provider_data),
            content_type='application/json',
        )
        data = json.loads(response.data.decode())
        self.assertEqual(response.status_code, 201)
        self.assertEqual(data['id'], self.data_provider_data.get('id'))
