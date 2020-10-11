import logging
from flask import Blueprint, request, jsonify

from app.exceptions import ApiException
from app.schemas.data_obligation import DataObligationDeserializer, \
    DataObligationSerializer
from app.extensions import db
from app.models import DataObligation, DataOwner, DataCategory

logger = logging.getLogger(__name__)
blueprint = Blueprint('data-obligations', __name__)


@blueprint.route(
    '/data-owners/<string:data_owner_id>/data-obligations', methods=['POST']
)
def create_data_owner_obligation(data_owner_id):
    logger.info("create_data_owner_obligation service call")

    json_data = request.get_json()

    if not json_data:
        raise ApiException("No data provided")

    try:
        data_owner = DataOwner.query.filter_by(id=data_owner_id).first()

        if not data_owner:
            raise ApiException("Data owner is not registered")

        # Form the user
        data_obligation_deserializer = DataObligationDeserializer()
        data = data_obligation_deserializer.load(json_data)

        data_obligation = DataObligation.query \
            .filter_by(data_owner=data_owner) \
            .filter_by(attribute_id=data.get('attribute_id')) \
            .filter_by(data_category=data.get('data_category')) \
            .first()

        if data_obligation is not None:
            data_obligation.attribute_constraint = \
                data.get('attribute_constraint')
        else:
            data_obligation = DataObligation(
                data_owner=data_owner,
                attribute_id=data.get('attribute_id'),
                attribute_constraint=data.get('attribute_constraint'),
                data_category=data.get('data_category')
            )

        data_obligation.save()
        db.session.commit()

        # Create serializer
        data_obligation_serializer = DataObligationSerializer()
        # Return a json response
        return jsonify(data_obligation_serializer.dump(data_obligation)), 201
    finally:
        db.session.close()


@blueprint.route(
    '/data-owners/<string:data_owner_id>/data-obligations/'
    '<string:data_category>',
    methods=['GET']
)
def get_data_owner_obligations(data_owner_id, data_category):
    logger.info("get_data_owner_obligations service call")

    try:
        data_owner = DataOwner.query.filter_by(id=data_owner_id).first()

        if not data_owner:
            raise ApiException("Data owner is not registered")

        # Form the user
        data_obligation_serializer = DataObligationSerializer()

        obligations = DataObligation.query.filter_by(
            data_owner=data_owner
        ).filter_by(
            data_category=DataCategory.from_string(data_category)
        ).all()

        # Return a json response
        return jsonify(
            data_obligation_serializer.dump(obligations, many=True)
        ), 200
    finally:
        db.session.close()
