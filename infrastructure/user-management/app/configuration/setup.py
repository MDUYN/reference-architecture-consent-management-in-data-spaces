import os
import logging
import marshmallow.exceptions as marshmallow_exceptions
from flask import Flask
from flask_cors import CORS
from flask import jsonify
from typing import Dict, List


from app.configuration.settings import DevConfig
from app.views.user_views import blueprint as user_blueprint
from app.extensions import logger, db
from app.exceptions import ApiException


def create_app(config_object=DevConfig) -> Flask:
    """
    Function to create a Flask app. The app will be based on the \
    given configuration from the client.
    """

    app = Flask(__name__.split('.')[0])
    CORS(app)
    app.url_map.strict_slashes = False

    # Load config
    app.config.from_object(config_object)

    # Register blueprints
    register_blueprints(app)

    # Register error handler
    register_error_handlers(app)

    # Configure database
    db.configure(config_object.DATABASE_CONFIG)
    db.initialize_tables()

    configure_logging()
    return app


def register_blueprints(app) -> None:
    app.register_blueprint(user_blueprint)


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

    def create_error_response(error_message: str, status_code: int = 400):
        response = jsonify({"error_message": error_message})
        response.status_code = status_code
        return response

    def format_marshmallow_validation_error(errors: Dict):
        error_message = ""

        for key in errors:

            if isinstance(errors[key], Dict):
                error_message += format_marshmallow_validation_error(
                    errors[key])

            if isinstance(errors[key], List):
                message = "{} {}".format(key.title(), errors[key][0].lower())

                if not message.endswith('.'):
                    message += '.'
                error_message += message + ' '

        return error_message

    def error_handler(error):
        logger.error("exception of type {} occurred".format(type(error)))
        logger.exception(error)

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
