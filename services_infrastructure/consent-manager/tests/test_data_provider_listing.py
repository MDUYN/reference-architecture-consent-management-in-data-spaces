import json
from uuid import uuid4
from tests import TestBase
from app.models import DataProvider


class TestDataProviderCreation(TestBase):

    def setUp(self) -> None:
        super(TestDataProviderCreation, self).setUp()
        data_provider = DataProvider(data_provider_id=str(uuid4()))
        data_provider.save()
        data_provider = DataProvider(data_provider_id=str(uuid4()))
        data_provider.save()

    def test_creation(self):
        response = self.client.get(
            '/data-providers',
            content_type='application/json',
        )
        data = json.loads(response.data.decode())

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(data), 2)
