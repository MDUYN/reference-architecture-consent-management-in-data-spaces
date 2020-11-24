import json
from uuid import uuid4
from app.models import DataOwner, DataProvider, DataCategory, DataSet, \
    PolicyRequest, PolicyRequestDataPermission, PolicyRequestDataObligation
from app.extensions import db
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

        self.policy_request = PolicyRequest(
            data_set_id=self.data_set.id,
            data_consumer_id=self.data_consumer,
            request_data_obligations=[
                PolicyRequestDataObligation(
                    attribute_id="commercial_usage",
                    attribute_constraint="true"
                )
            ],
            request_data_permissions=[
                PolicyRequestDataPermission(
                    attribute_id="commercial_usage",
                    attribute_constraint="true"
                )
            ]
        )

        self.policy_request.save()
        db.session.commit()

    def test_creation(self):
        response = self.client.get(
            '/policy-requests/{}'.format(
                self.data_set.id
            ),
            content_type='application/json'
        )
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(1, len(data))
