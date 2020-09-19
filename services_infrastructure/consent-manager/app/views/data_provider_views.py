from flask import Blueprint, request, jsonify

from app.exceptions import ApiException
from app.extensions import logger
from app.schemas.data_provider import DataProviderDeserializer, \
    DataProviderSerializer
from app.extensions import db
from app.models import DataProvider

blueprint = Blueprint('data-providers', __name__)


@blueprint.route('/data-providers', methods=['POST'])
def create_data_provider():
    logger.info("create_data_provider service call")

    json_data = request.get_json()

    if not json_data:
        raise ApiException("No data provided")

    # Deserialize the data provider
    data_provider_schema = DataProviderDeserializer()
    data_provider = data_provider_schema.load(json_data)

    # Save the user
    data_provider.save()
    db.session.commit()

    # Create Serializer
    serializer = DataProviderSerializer()

    # Return a json response
    return jsonify(serializer.dump(data_provider)), 201


@blueprint.route('/data-providers', methods=['GET'])
def get_data_providers():
    logger.info("get_data_providers service call")

    # Get all data  providers
    data_providers = DataProvider.query.all()

    # Serialize the data providers
    serializer = DataProviderSerializer()

    # Return a json response
    return jsonify(serializer.dump(data_providers, many=True)), 200

