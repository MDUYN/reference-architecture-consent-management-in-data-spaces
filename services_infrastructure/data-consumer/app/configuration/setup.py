import os
import logging
import marshmallow.exceptions as marshmallow_exceptions
from flask import Flask
from flask_cors import CORS
from flask import jsonify
from typing import Dict, List
from werkzeug.exceptions import HTTPException

from app.configuration.settings import DevConfig, TestConfig, ProdConfig, \
    Environment
from app.configuration.constants import ENVIRONMENT, LOG_LEVEL
from app.exceptions import ApiException, ClientException
from app.extensions import setup_logging
from app.views.policy_views import blueprint as policy_blueprint
from app.views.data_set_views import blueprint as data_set_blueprint
from app.configuration.settings import POLICIES_DIR

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

    # Setup logging
    app = Flask(__name__.split('.')[0])
    CORS(app)
    app.url_map.strict_slashes = False

    # Load config
    app.config.from_object(config_object)

    setup_logging(app.config.get(LOG_LEVEL))

    # Register blueprints
    register_blueprints(app)

    # Register error handler
    register_error_handlers(app)

    if not os.path.isdir(POLICIES_DIR):
        os.mkdir(POLICIES_DIR)

    logger.info(
        "Running in {} configuration".format(app.config.get(ENVIRONMENT))
    )
    return app


def register_blueprints(app) -> None:
    app.register_blueprint(policy_blueprint)
    app.register_blueprint(data_set_blueprint)


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
        elif isinstance(error, ClientException):
            return create_error_response(
                "Currently a dependent service is not available, "
                "please try again later", 503
            )
        elif isinstance(error, ApiException):
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
