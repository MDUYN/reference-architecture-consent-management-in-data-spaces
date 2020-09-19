import json
from uuid import uuid4
from tests import TestBase
from app.models import DataOwner


class TestDataProviderCreation(TestBase):

    def setUp(self) -> None:
        super(TestDataProviderCreation, self).setUp()
        data_owner = DataOwner(data_owner_id=str(uuid4()))
        data_owner.save()
        data_owner = DataOwner(data_owner_id=str(uuid4()))
        data_owner.save()

    def test_creation(self):
        response = self.client.get(
            '/data-owners',
            content_type='application/json',
        )
        data = json.loads(response.data.decode())

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(data), 2)
