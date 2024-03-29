import os
import logging
import marshmallow.exceptions as marshmallow_exceptions
from flask import Flask
from flask_cors import CORS
from flask import jsonify
from typing import Dict, List
from werkzeug.exceptions import HTTPException

from app.views.data_owner_views import blueprint as data_owners_blueprint
from app.views.data_set_views import blueprint as data_sets_blueprint
from app.views.policy_views import blueprint as policy_blueprint
from app.views.data_obligations_views import \
    blueprint as data_obligations_blueprint
from app.views.data_permissions_views import \
    blueprint as data_permissions_blueprint
from app.views.data_provider_views import blueprint as data_providers_blueprint
from app.exceptions import ApiException
from app.configuration.constants import ENVIRONMENT
from app.configuration.settings import Environment
from app.configuration.settings import DevConfig, TestConfig, ProdConfig

logger = logging.getLogger(__name__)


def create_app(config_object=DevConfig) -> Flask:
    """
    Function to create a Flask app. The app will be based on the \
    given configuration from the client.
    """

    # Specify config object
    if config_object is None:
        env = os.environ.get(ENVIRONMENT)

        if Environment.TEST.equals(env):
            config_object = TestConfig
        elif Environment.PROD.equals(env):
            config_object = ProdConfig
        else:
            config_object = DevConfig

    app = Flask(__name__.split('.')[0])
    CORS(app)
    app.url_map.strict_slashes = False

    # Load config
    app.config.from_object(config_object)

    # Register blueprints
    register_blueprints(app)

    # Register error handler
    register_error_handlers(app)

    logger.info(
        "Running in {} configuration".format(app.config.get(ENVIRONMENT))
    )
    return app


def register_blueprints(app) -> None:
    app.register_blueprint(data_owners_blueprint)
    app.register_blueprint(data_sets_blueprint)
    app.register_blueprint(data_providers_blueprint)
    app.register_blueprint(data_obligations_blueprint)
    app.register_blueprint(data_permissions_blueprint)
    app.register_blueprint(policy_blueprint)


def configure_logging() -> None:
    env = os.getenv('ENV', 'dev')

    if env == 'dev':
        logger.setLevel(logging.DEBUG)

    if env == 'dev':
        logger.setLevel(logging.INFO)


def register_error_handlers(app) -> None:
    """
    Function that will register all the specified error handlers for the app
    """

    def create_error_response(error_message, status_code: int = 400):
        response = jsonify({"error_message": error_message})
        response.status_code = status_code
        return response

    def format_marshmallow_validation_error(errors: Dict):
        errors_message = {}

        for key in errors:

            if isinstance(errors[key], Dict):
                errors_message[key] = \
                    format_marshmallow_validation_error(errors[key])

            if isinstance(errors[key], List):
                errors_message[key] = errors[key][0].lower()
        return errors_message

    def error_handler(error):
        logger.error("exception of type {} occurred".format(type(error)))
        logger.exception(error)

        if isinstance(error, HTTPException):
            return create_error_response(str(error), error.code)

        # Handle ApiException
        if isinstance(error, ApiException):
            return create_error_response(
                error.error_message, error.status_code
            )
        elif isinstance(error, marshmallow_exceptions.ValidationError):
            error_message = format_marshmallow_validation_error(error.messages)
            return create_error_response(error_message)
        else:
            # Internal error happened that was unknown
            return "Internal server error", 500

    app.errorhandler(Exception)(error_handler)
