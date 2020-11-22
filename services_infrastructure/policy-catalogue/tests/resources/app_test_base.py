from flask_testing import TestCase

from app.configuration.setup import create_app
from app.configuration.settings import TestConfig

from tests.resources.sqlite_test_base import SQLiteTestBase


class AppTestBase(TestCase, SQLiteTestBase):

    def setUp(self) -> None:
        super(AppTestBase, self).setUp()

    def create_app(self):
        app = create_app(TestConfig)
        return app

    def tearDown(self):
        super(AppTestBase, self).tearDown()
