import os
import json
from uuid import uuid4
from tests.resources import AppTestBase

THIS_DIR = os.path.dirname(os.path.abspath(__file__))
IMAGE_RESOURCES_PATH = os.path.join(THIS_DIR, os.pardir, 'resources/policies')


class TestUploadProfileImage(AppTestBase):

    def setUp(self) -> None:
        super(TestUploadProfileImage, self).setUp()

    def test_creation(self):

        data = {
            "policy": (open(
                IMAGE_RESOURCES_PATH + os.path.sep + "sample_policy.json", 'rb'
            ),
                     'sample_policy.json')
        }

        response = self.client.post(
            '/policies/data-provider/{}/data-set/{}/data-consumer/{}'.format(uuid4(), uuid4(), uuid4()),
            data=data,
            content_type='multipart/form-data',
        )

        self.assertEqual(200, response.status_code)

        data = json.loads(response.data.decode())
        response = self.client.get(
            '/policies/{}'.format(data.get('id')),
            content_type='multipart/form-data',
        )

        self.assertEqual(200, response.status_code)

