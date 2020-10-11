import logging
from flask import Blueprint, request, jsonify

from app.exceptions import ApiException
from app.schemas.data_sets import DataSetDeserializer, DataSetSerializer
from app.extensions import db
from app.models import DataSet

blueprint = Blueprint('data-sets', __name__)
logger = logging.getLogger(__name__)


@blueprint.route('/data-sets', methods=['POST'])
def create_data_set():
    logger.info("create_data_set service call")

    json_data = request.get_json()

    if not json_data:
        raise ApiException("No data provided")

    try:
        # Form the user
        data_set_schema = DataSetDeserializer()
        data_set = data_set_schema.load(json_data)

        # Save the user
        data_set.save()
        db.session.commit()

        # Create Serializer
        serializer = DataSetSerializer()

        # Return a json response
        return jsonify(serializer.dump(data_set)), 201
    finally:
        db.session.connection().close()


@blueprint.route('/data-sets', methods=['GET'])
def get_data_sets():
    logger.info("get_data_sets service call")

    try:
        # Get all data owners
        data_sets = DataSet.query.all()

        # Form the user
        serializer = DataSetSerializer()

        # Return a json response
        return jsonify(serializer.dump(data_sets, many=True)), 200
    finally:
        db.session.close()


@blueprint.route(
    '/data-sets/<string:data_set_id>/policy/<policy_id>', methods=['GET']
)
def get_data_set(data_set_id, policy_id):
    logger.info("get_data_set service call")

    try:
        # Get all data owners
        data_sets = DataSet.query.filter_by(id=data_set_id).first()

        # Return a json response
        return "Success", 200
    finally:
        db.session.close()
