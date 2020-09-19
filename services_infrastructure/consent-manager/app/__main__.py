from app.configuration.setup import create_app
from app.configuration.constants import DATABASE_CONFIG
from app.extensions import db

if __name__ == '__main__':
    app = create_app()
    database_config = app.config.get(DATABASE_CONFIG)
    db.configure(database_config=database_config, ssl_require=True)
    app.run(debug=True, host='0.0.0.0', port=5000)
