import os
from enum import Enum
from datetime import timedelta
from pathlib import Path
from app.configuration.constants import DATABASE_HOST, DATABASE_NAME, \
    DATABASE_TYPE, DATABASE_PASSWORD, DATABASE_USERNAME, AWS_S3_ACCESS_KEY, \
    AWS_S3_SECRET, AWS_S3_IMAGES_BUCKET, EMAIL_SECRET_SALT, \
    APP_SECRET_KEY, EMAIL_SECRET_KEY, USER_MANAGER_SERVICE_ADDRESS, \
    ORGANIZATION_SERVICE_ADDRESS, AWS_S3_IMAGES_BUCKET_FOLDER
from app.exceptions import OperationalException

BASE_DIR = str(Path(__file__).parent.parent.parent)
PROJECT_ROOT = os.path.abspath(os.path.join(BASE_DIR, os.pardir))


class Environment(Enum):
    """
    Class TimeUnit: Enum for data base type
    """
    DEV = 'dev'
    PROD = 'prod'
    TEST = 'test'

    # Static factory method to convert
    # a string to environment
    @staticmethod
    def from_string(value: str):

        if isinstance(value, str):

            if value.lower() in ('dev', 'development'):
                return Environment.DEV

            elif value.lower() in ('test', 'testing'):
                return Environment.TEST

            elif value.lower() in ('prod', 'production'):
                return Environment.PROD
            else:
                raise OperationalException(
                    'Could not convert value {} to a data base type'.format(
                        value
                    )
                )

        else:
            raise OperationalException(
                "Could not convert non string value to a data base type"
            )

    def equals(self, other):

        if isinstance(other, Enum):
            return self.value == other.value
        else:

            try:
                environment = Environment.from_string(other)
                return environment == self
            except OperationalException:
                pass

            return other == self.value


class Config(object):
    """Base configuration."""
    LOG_LEVEL = 'INFO'
    SECRET_KEY = os.environ.get(APP_SECRET_KEY, 'secret_key')
    EMAIL_SECRET_KEY = os.environ.get(EMAIL_SECRET_KEY, 'email_secret_key')
    EMAIL_SECRET_SALT = os.environ.get(EMAIL_SECRET_SALT, 'email_secret_salt')
    APP_DIR = os.path.abspath(os.path.dirname(__file__))
    PROJECT_ROOT = os.path.abspath(os.path.join(APP_DIR, os.pardir))
    DEBUG_TB_INTERCEPT_REDIRECTS = False
    CACHE_TYPE = 'simple'  # Can be "memcached", "redis", etc.
    CORS_ORIGIN_WHITELIST = [
        'http://0.0.0.0:4100',
        'http://localhost:4100',
        'http://0.0.0.0:8000',
        'http://localhost:8000',
        'http://0.0.0.0:4200',
        'http://localhost:4200',
        'http://0.0.0.0:4000',
        'http://localhost:4000',
    ]


class ProdConfig(Config):
    """Production configuration."""

    ENV = 'PROD'
    LOG_LEVEL = 'WARNING'
    DEBUG = False
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    SECRET_KEY = os.environ.get('SECRET_KEY', 'secret-key')
    DATABASE_CONFIG = {
        'DATABASE_NAME': os.getenv(DATABASE_NAME),
        'DATABASE_TYPE': os.getenv(DATABASE_TYPE),
        'DATABASE_HOST': os.getenv(DATABASE_HOST),
        'DATABASE_PASSWORD': os.getenv(DATABASE_PASSWORD),
        'DATABASE_USERNAME': os.getenv(DATABASE_USERNAME),
        'DATABASE_DIRECTORY_PATH': BASE_DIR
    }
    USER_MANAGER_SERVICE_ADDRESS = os.environ.get(USER_MANAGER_SERVICE_ADDRESS)
    ORGANIZATION_SERVICE_ADDRESS = os.environ.get(ORGANIZATION_SERVICE_ADDRESS)
    AWS_S3_ACCESS_KEY = os.environ.get(AWS_S3_ACCESS_KEY)
    AWS_S3_SECRET = os.environ.get(AWS_S3_SECRET)
    AWS_S3_IMAGES_BUCKET = os.environ.get(AWS_S3_IMAGES_BUCKET)
    AWS_S3_IMAGES_BUCKET_FOLDER = os.environ.get(AWS_S3_IMAGES_BUCKET_FOLDER)


class DevConfig(Config):
    """Development configuration."""

    ENV = 'DEV'
    LOG_LEVEL = 'INFO'
    DEBUG = True
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=30)
    SECRET_KEY = os.environ.get('SECRET_KEY', 'secret-key')
    CACHE_TYPE = 'simple'  # Can be "memcached", "redis", etc.
    DATABASE_CONFIG = {
        'DATABASE_NAME': os.getenv(DATABASE_NAME, 'dev_db'),
        'DATABASE_TYPE': os.getenv(DATABASE_TYPE, 'sqlite3'),
        'DATABASE_HOST': os.getenv(DATABASE_HOST),
        'DATABASE_PASSWORD': os.getenv(DATABASE_PASSWORD),
        'DATABASE_USERNAME': os.getenv(DATABASE_USERNAME),
        'DATABASE_DIRECTORY_PATH': BASE_DIR
    }
    USER_MANAGER_SERVICE_ADDRESS = os.environ.get(
        USER_MANAGER_SERVICE_ADDRESS, '127.0.0.1:5000'
    )
    ORGANIZATION_SERVICE_ADDRESS = os.environ.get(
        ORGANIZATION_SERVICE_ADDRESS, '127.0.0.1:7050'
    )


class TestConfig(Config):
    """Test configuration."""
    SECRET_KEY = os.environ.get('SECRET_KEY', 'secret-key')
    TESTING = True
    DEBUG = True
    LOG_LEVEL = 'WARNING'
    ENV = 'TEST'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(seconds=30)
    DATABASE_CONFIG = {
        'DATABASE_NAME': 'test_db',
        'DATABASE_TYPE': 'sqlite3',
        'DATABASE_DIRECTORY_PATH': BASE_DIR
    }
