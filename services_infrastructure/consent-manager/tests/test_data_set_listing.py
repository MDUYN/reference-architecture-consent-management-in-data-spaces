import json
from uuid import uuid4
from tests import TestBase
from app.models import DataOwner, DataProvider, DataCategory, DataSet
from app.extensions import db


class TestDataSetListing(TestBase):

    def setUp(self) -> None:
        super(TestDataSetListing, self).setUp()
        self.data_provider = DataProvider(data_provider_id=str(uuid4()))
        self.data_provider.save()

        data_owner_one = DataOwner(data_owner_id=str(uuid4()))
        data_owner_one.save()

        data_owner_two = DataOwner(data_owner_id=str(uuid4()))
        data_owner_two.save()

        data_set = DataSet(
            data_set_id=str(uuid4()),
            data_category=DataCategory.energy_generation_data
        )
        data_set.data_owners.append(data_owner_one)
        data_set.data_owners.append(data_owner_two)
        data_set.data_provider = self.data_provider
        data_set.save()

        data_set = DataSet(
            data_set_id=str(uuid4()),
            data_category=DataCategory.energy_generation_data
        )
        data_set.data_owners.append(data_owner_one)
        data_set.data_owners.append(data_owner_two)
        data_set.data_provider = self.data_provider
        data_set.save()

        db.session.commit()

    def test_listing(self):
        response = self.client.get(
            '/{}/data-sets'.format(self.data_provider.id),
            content_type='application/json',
        )
        data = json.loads(response.data.decode())
        self.assertEqual(len(data), 2)
