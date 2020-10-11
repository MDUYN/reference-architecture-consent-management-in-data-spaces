import logging
from flask import Blueprint, request, jsonify

from app.exceptions import ApiException
from app.schemas.data_sets import DataSetDeserializer, DataSetSerializer
from app.extensions import db
from app.models import DataSet, DataProvider

blueprint = Blueprint('data-sets', __name__)
logger = logging.getLogger(__name__)


@blueprint.route(
    '/<string:data_provider_id>/data-sets/<string:data_set_id>',
    methods=['POST']
)
def create_data_policy(data_provider_id, data_set_id):
    logger.info("create_data_set service call")

    json_data = request.get_json()

    if not json_data:
        raise ApiException("No data provided")

    try:
        # Check if data provider exists
        data_provider = DataProvider.query.filter_by(id=data_provider_id).first()

        if data_provider is None:
            raise ApiException("Data provider is not registered")

        data_set = DataSet.query.filter_by(
            id=data_set_id, data_provider=data_provider
        ).first()

        if data_set is None:
            raise ApiException("Data provider has no data set: {}".format(
                data_set_id
            ))

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
    finally:
        db.session.close()