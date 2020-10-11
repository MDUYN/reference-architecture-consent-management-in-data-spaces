import logging
from flask import Blueprint, request, jsonify

from app.exceptions import ApiException
from app.schemas.data_permission import DataPermissionDeserializer, \
    DataPermissionSerializer
from app.extensions import db
from app.models import DataPermission, DataOwner, DataCategory

blueprint = Blueprint('data-permissions', __name__)
logger = logging.getLogger(__name__)


@blueprint.route(
    '/data-owners/<string:data_owner_id>/data-permissions', methods=['POST']
)
def create_data_owner_permission(data_owner_id):
    logger.info("create_data_owner_permission service call")

    json_data = request.get_json()

    if not json_data:
        raise ApiException("No data provided")

    try:
        data_owner = DataOwner.query.filter_by(id=data_owner_id).first()

        if not data_owner:
            raise ApiException("Data owner is not registered")

        # Form the user
        data_permission_deserializer = DataPermissionDeserializer()
        data = data_permission_deserializer.load(json_data)

        data_permission = DataPermission.query\
            .filter_by(data_owner=data_owner)\
            .filter_by(attribute_id=data.get('attribute_id')) \
            .filter_by(data_category=data.get('data_category')) \
            .first()

        if data_permission is not None:
            data_permission.attribute_constraint = \
                data.get('attribute_constraint')
        else:
            data_permission = DataPermission(
                data_owner=data_owner,
                attribute_id=data.get('attribute_id'),
                attribute_constraint=data.get('attribute_constraint'),
                data_category=data.get('data_category')
            )

        data_permission.save()
        db.session.commit()

        # Create serializer
        data_permission_serializer = DataPermissionSerializer()
        # Return a json response
        return jsonify(data_permission_serializer.dump(data_permission)), 201
    finally:
        db.session.close()


@blueprint.route(
    '/data-owners/<string:data_owner_id>/data-permissions/'
    '<string:data_category>',
    methods=['GET']
)
def get_data_owner_permissions(data_owner_id, data_category):
    logger.info("get_data_owner_permissions service call")

    try:
        data_owner = DataOwner.query.filter_by(id=data_owner_id).first()

        if not data_owner:
            raise ApiException("Data owner is not registered")

        # Form the user
        data_permission_serializer = DataPermissionSerializer()

        permissions = DataPermission.query.filter_by(
            data_owner=data_owner
        ).filter_by(
            data_category=DataCategory.from_string(data_category)
        ).all()

        # Return a json response
        return jsonify(
            data_permission_serializer.dump(permissions, many=True)
        ), 200
    finally:
        db.session.close()
