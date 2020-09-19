from flask import Blueprint, request, jsonify

from app.exceptions import ApiException
from app.extensions import logger
from app.schemas.data_sets import DataSetDeserializer, DataSetSerializer
from app.extensions import db
from app.models import DataSet, DataProvider

blueprint = Blueprint('data-sets', __name__)


@blueprint.route('/<string:data_provider_id>/data-sets', methods=['POST'])
def create_data_set(data_provider_id):
    logger.info("create_data_set service call")

    json_data = request.get_json()

    if not json_data:
        raise ApiException("No data provided")

    # Check if data provider exists
    data_provider = DataProvider.query.filter_by(id=data_provider_id).first()

    if data_provider is None:
        raise ApiException("Data provider is not registered")

    # Create the data set
    data_set_schema = DataSetDeserializer()
    data_set = data_set_schema.load(json_data)
    data_set.data_provider = data_provider

    # Save the data set
    data_set.save()

    db.session.commit()

    # Create Serializer
    serializer = DataSetSerializer()

    # Return a json response
    return jsonify(serializer.dump(data_set)), 201


@blueprint.route('/<string:data_provider_id>/data-sets', methods=['GET'])
def get_data_sets(data_provider_id):
    logger.info("get_data_sets service call")

    # Check if data provider exists
    data_provider = DataProvider.query.filter_by(id=data_provider_id).first()

    if data_provider is None:
        raise ApiException("Data provider is not registered")

    # Get all data owners
    data_sets = DataSet.query.filter_by(data_provider=data_provider).all()

    # Form the user
    serializer = DataSetSerializer()

    # Return a json response
    return jsonify(serializer.dump(data_sets, many=True)), 200

