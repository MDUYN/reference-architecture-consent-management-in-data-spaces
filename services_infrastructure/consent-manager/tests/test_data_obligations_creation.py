import json
from uuid import uuid4
from tests import TestBase, random_string
from app.models import DataOwner, DataObligation, DataCategory
from app.extensions import db


class TestDataObligationsCreation(TestBase):

    def setUp(self) -> None:
        super(TestDataObligationsCreation, self).setUp()
        self.data_owner = DataOwner(data_owner_id=str(uuid4()))
        self.data_owner.save()

        self.data_obligation_data = {
            'attribute_id': random_string(10),
            'attribute_constraint': random_string(10),
            'data_category': DataCategory.energy_generation_data.value
        }
        db.session.commit()

    def test_creation(self):
        response = self.client.post(
            '/data-owners/{}/data-obligations'.format(self.data_owner.id),
            data=json.dumps(self.data_obligation_data),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(len(DataObligation.query.all()), 1)

    def test_creation_update(self):

        data_obligation = DataObligation(
            attribute_id=self.data_obligation_data.get('attribute_id'),
            attribute_constraint=self.data_obligation_data.get('attribute_constraint'),
            data_category=self.data_obligation_data.get('data_category'),
            data_owner=self.data_owner
        )
        data_obligation.save()

        response = self.client.post(
            '/data-owners/{}/data-obligations'.format(self.data_owner.id),
            data=json.dumps(self.data_obligation_data),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(len(DataObligation.query.all()), 1)

    def test_creation_with_different_data_category(self):
        data_obligation = DataObligation(
            attribute_id=self.data_obligation_data.get('attribute_id'),
            attribute_constraint=self.data_obligation_data.get(
                'attribute_constraint'),
            data_category=self.data_obligation_data.get('data_category'),
            data_owner=self.data_owner
        )
        data_obligation.save()
        db.session.commit()

        self.data_obligation_data['data_category'] = \
            DataCategory.energy_usage_data.value

        response = self.client.post(
            '/data-owners/{}/data-obligations'.format(self.data_owner.id),
            data=json.dumps(self.data_obligation_data),
            content_type='application/json'
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(len(DataObligation.query.all()), 2)

