import json
from app.models import User
from app.configuration.constants import MAX_LENGTH_SLUG, \
    MAX_LENGTH_FIRST_NAME, MAX_LENGTH_LAST_NAME, MAX_LENGTH_PASSWORD
from tests import random_string
from tests import TestBase


class TestUserCreation(TestBase):

    def setUp(self) -> None:
        super(TestUserCreation, self).setUp()
        self.user_data = {
            'username': random_string(MAX_LENGTH_SLUG),
            'profile': {
                'first_name': random_string(MAX_LENGTH_FIRST_NAME),
                'last_name': random_string(MAX_LENGTH_LAST_NAME),
            },
            'password': random_string(MAX_LENGTH_PASSWORD),
            'email': 'user_one@gmail.com'
        }

    def test_creation(self):

        response = self.client.post(
            '/users',
            data=json.dumps(self.user_data),
            content_type='application/json',
        )

        data = json.loads(response.data.decode())
        self.assertEqual(response.status_code, 201)
        self.assertEqual(data['username'], self.user_data.get('username'))
        self.assertEqual(data['email'], self.user_data.get('email'))
        self.assertEqual(data['profile'], self.user_data.get('profile'))
        self.assertIsNone(data.get('password'))

        self.assertEqual(len(User.query.all()), 1)


