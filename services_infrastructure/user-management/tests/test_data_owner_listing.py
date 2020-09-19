import json
from uuid import uuid4
from tests import TestBase
from app.models import DataOwner
from app.extensions import db


class TestDataOwnerCreation(TestBase):

    def setUp(self) -> None:
        super(TestDataOwnerCreation, self).setUp()

    def test_listing(self):
        response = self.client.get(
            '/data-owners', content_type='application/json'
        )

        data = json.loads(response.data.decode())
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(data), len(DataOwner.query.all()))

        data_owner = DataOwner(data_owner_id=str(uuid4()))
        data_owner.save()
        db.session.commit()

        data_owner = DataOwner(data_owner_id=str(uuid4()))
        data_owner.save()
        db.session.commit()

        response = self.client.get(
            '/data-owners', content_type='application/json'
        )

        data = json.loads(response.data.decode())
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(data), len(DataOwner.query.all()))