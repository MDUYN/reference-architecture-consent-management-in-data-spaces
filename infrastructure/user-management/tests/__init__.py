import os
import random
import string
from flask_testing import TestCase

from app.configuration.setup import create_app
from app.configuration.settings import TestConfig


class TestBase(TestCase):

    def create_app(self):
        app = create_app(TestConfig)
        return app

    @classmethod
    def teardown_class(cls):
        database_file = os.path.join(
                TestConfig.DATABASE_CONFIG['DATABASE_DIRECTORY_PATH'],
                TestConfig.DATABASE_CONFIG['DATABASE_NAME'] + '.sqlite3',
            )

        if os.path.isfile(database_file):
            os.remove(database_file)


def random_string(n, spaces: bool = False):

    if spaces:
        return ''.join(
            random.choice(string.ascii_lowercase + ' ') for _ in range(n)
        )

    return ''.join(random.choice(string.ascii_lowercase) for _ in range(n))
