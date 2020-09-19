"""Application configuration."""
import os
from datetime import timedelta
from pathlib import Path
from app.configuration.constants import DATABASE_HOST, DATABASE_NAME, \
    DATABASE_TYPE, DATABASE_PASSWORD, DATABASE_USERNAME
BASE_DIR = str(Path(__file__).parent.parent.parent)
PROJECT_ROOT = os.path.abspath(os.path.join(BASE_DIR, os.pardir))


class Config(object):
    """Base configuration."""

    SECRET_KEY = os.environ.get('SECRET_KEY', 'secret-key')
    APP_DIR = os.path.abspath(os.path.dirname(__file__))  # This directory
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

    ENV = 'prod'
    DEBUG = False
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)


class DevConfig(Config):
    """Development configuration."""

    ENV = 'dev'
    DEBUG = True
    CACHE_TYPE = 'simple'  # Can be "memcached", "redis", etc.
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(seconds=30)
    DATABASE_CONFIG = {
        'DATABASE_NAME': os.getenv(DATABASE_NAME, 'dev_db'),
        'DATABASE_TYPE': os.getenv(DATABASE_TYPE, 'sqlite3'),
        'DATABASE_HOST': os.getenv(DATABASE_HOST),
        'DATABASE_PASSWORD': os.getenv(DATABASE_PASSWORD),
        'DATABASE_USERNAME': os.getenv(DATABASE_USERNAME),
        'DATABASE_DIRECTORY_PATH': BASE_DIR
    }


class TestConfig(Config):
    """Test configuration."""
    SECRET_KEY = os.environ.get('SECRET_KEY', 'secret-key')
    TESTING = True
    DEBUG = True
    ENV = 'test'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(seconds=30)
    DATABASE_CONFIG = {
        'DATABASE_NAME': 'test_db',
        'DATABASE_TYPE': 'sqlite3',
        'DATABASE_DIRECTORY_PATH': BASE_DIR
    }
