import os
import random
import string
from flask_testing import TestCase
import testing.postgresql

from app.configuration.setup import create_app
from app.extensions import db
from app.configuration.settings import TestConfig


class TestBase(TestCase):

    def setUp(self) -> None:
        self.postgresql = testing.postgresql.Postgresql()
        db.configure(database_url=self.postgresql.url())
        db.initialize_tables()

    def tearDown(self) -> None:
        db.session.commit()
        self.postgresql.stop()

    def create_app(self):
        app = create_app(TestConfig)
        return app


def random_string(n, spaces: bool = False):

    if spaces:
        return ''.join(
            random.choice(string.ascii_lowercase + ' ') for _ in range(n)
        )

    return ''.join(random.choice(string.ascii_lowercase) for _ in range(n))
