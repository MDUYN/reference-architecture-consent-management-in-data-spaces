import os
from pathlib import Path
from unittest import TestCase

from app.extensions import db

BASE_DIR = str(Path(__file__).parent.parent.parent)


class SQLiteTestBase(TestCase):
    CONFIG = {
        'DATABASE_NAME': 'test_db',
        'DATABASE_DIRECTORY_PATH': BASE_DIR
    }

    def setUp(self) -> None:
        db.connect_sqlite(SQLiteTestBase.CONFIG)
        db.initialize_tables()

    def tearDown(self):
        database_file = os.path.join(
            SQLiteTestBase.CONFIG.get('DATABASE_DIRECTORY_PATH'),
            SQLiteTestBase.CONFIG.get('DATABASE_NAME') + '.sqlite3',
        )

        if os.path.isfile(database_file):
            os.remove(database_file)
