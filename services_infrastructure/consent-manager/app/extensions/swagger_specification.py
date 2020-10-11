from flask_swagger_ui import get_swaggerui_blueprint


def create_swagger_specification(app):
    swagger_url = '/swagger'

    swagger_specification = '/static/swagger.yaml'
    blueprint = get_swaggerui_blueprint(
        swagger_url,
        swagger_specification,
        config={
            'app_name': "Data Provider Service"
        }
    )

    app.register_blueprint(blueprint, url_prefix=swagger_url)
