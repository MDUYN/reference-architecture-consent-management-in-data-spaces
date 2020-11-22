import logging
from flask import redirect
from werkzeug.exceptions import NotFound

from app.configuration.settings import Environment
from app.configuration.setup import create_app
from app.configuration.constants import DATABASE_CONFIG, ENVIRONMENT
from app.extensions import db, DatabaseType, create_swagger_specification
from app.configuration.constants import DATABASE_TYPE

logger = logging.getLogger(__name__)

# Create app, and let it auto discover configuration
app = create_app(config_object=None)


@app.route('/')
def index():
    """
    Function that redirects index url to swagger page
    :return: redirection to swagger
    """

    if Environment.DEV.equals(app.config.get(ENVIRONMENT)):
        return redirect('/swagger')

    raise NotFound()


if __name__ == '__main__':

    # Setup database
    database_config = app.config.get(DATABASE_CONFIG)
    database_type = DatabaseType.from_string(database_config[DATABASE_TYPE])

    if database_type.equals(DatabaseType.POSTGRESQL):
        logger.info("Connecting to postgresql database")
        db.connect_postgresql(
            database_config=database_config,
            ssl_require=True
        )
    else:
        logger.info("Connecting to sqlite")
        db.connect_sqlite(database_config=database_config)

    db.initialize_tables()

    # Create swagger specification in dev
    if Environment.DEV.equals(app.config.get(ENVIRONMENT)):
        create_swagger_specification(app)

    # Run on port 5000
    app.run(debug=True, host='0.0.0.0', port=7000)
