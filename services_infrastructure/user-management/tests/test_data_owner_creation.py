import json
from uuid import uuid4
from tests import TestBase


class TestDataOwnerCreation(TestBase):

    def setUp(self) -> None:
        super(TestDataOwnerCreation, self).setUp()
        self.data_owner_data = {
            'id': str(uuid4()),
        }

    def test_creation(self):

        response = self.client.post(
            '/data-owners',
            data=json.dumps(self.data_owner_data),
            content_type='application/json',
        )

        data = json.loads(response.data.decode())
        self.assertEqual(response.status_code, 201)
        self.assertEqual(data['id'], self.data_owner_data.get('id'))
