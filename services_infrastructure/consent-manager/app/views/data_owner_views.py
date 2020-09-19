from flask import Blueprint, request, jsonify

from app.exceptions import ApiException
from app.extensions import logger
from app.schemas.data_owner import DataOwnerDeserializer, DataOwnerSerializer
from app.extensions import db
from app.models import DataOwner

blueprint = Blueprint('data-owners', __name__)


@blueprint.route('/data-owners', methods=['POST'])
def create_data_owner():
    logger.info("create_data_owner service call")

    json_data = request.get_json()

    if not json_data:
        raise ApiException("No data provided")

    # Form the user
    data_owner_schema = DataOwnerDeserializer()
    data_owner = data_owner_schema.load(json_data)

    # Save the user
    data_owner.save()
    db.session.commit()

    # Return a json response
    return jsonify(data_owner_schema.dump(data_owner)), 201


@blueprint.route('/data-owners', methods=['GET'])
def get_data_owners():
    logger.info("get_data_owners service call")

    # Get all data owners
    data_owners = DataOwner.query.all()

    # Form the user
    serializer = DataOwnerSerializer()

    # Return a json response
    return jsonify(serializer.dump(data_owners, many=True)), 200
