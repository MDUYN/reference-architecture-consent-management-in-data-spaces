from uuid import uuid4
from tests import TestBase
from app.models import DataSet, DataCategory
from app.extensions import db


class TestDataSetCreation(TestBase):

    def setUp(self) -> None:
        super(TestDataSetCreation, self).setUp()
        data_set = DataSet(
            data_set_id=str(uuid4()),
            data_category=DataCategory.energy_generation_data
        )
        data_set.save()
        db.session.commit()
        self.data_set_id = data_set.id

    def test_retrieve(self):
        response = self.client.get(
            '/data-sets/{}/policy/{}'.format(self.data_set_id, str(uuid4())),
            content_type='application/json'
        )

        self.assertEqual(response.status_code, 200)
