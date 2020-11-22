import os
import requests
import logging
from flask import Blueprint, request, jsonify, current_app
from app.models import Policy
from app.extensions import db
from app.schemas import PolicySerializer, PolicyDeserializer
from app.configuration.constants import CONSENT_MANAGER_SERVICE_ADDRESS

logger = logging.getLogger(__name__)
blueprint = Blueprint('algorithms', __name__)


@blueprint.route('/policies', methods=['post'])
def create_policy():
    logger.info("create_policy service call")
    json_data = request.get_json()

    try:
        deserializer = PolicyDeserializer()
        policy = deserializer.load(json_data)
        policy.save()
        db.session.commit()

        serializer = PolicySerializer()

        return jsonify(serializer.dump(policy)), 200
    finally:
        db.session.commit()


@blueprint.route('/policies', methods=['GET'])
def list_policies():
    logger.info("list_policies service call")

    try:
        policies = Policy.query.all()
        serializer = PolicySerializer()
        return jsonify(serializer.dump(policies, many=True)), 200
    finally:
        db.session.commit()


@blueprint.route('/policies/<string:policy_id>/', methods=['DELETE'])
def delete_policy(policy_id):
    logger.info("delete_policy service call")

    try:
        policy = Policy.query.filter_by(id=policy_id).first_or_404(
            "Policy not found"
        )
        policy_content_path = policy.policy_content_path
        os.remove(policy_content_path)
        policy.delete()
        db.session.commit()
        return '', 204
    finally:
        db.session.commit()


@blueprint.route('/data-provider/<string:data_provider_id>/data-set/<string:data_set_id>', methods=['GET'])
def request_policy(data_provider_id, data_set_id):
    try:
        requests.post("{}/policy/{}/data-sets/{}".format(
            current_app.config[CONSENT_MANAGER_SERVICE_ADDRESS],
            data_provider_id,
            data_set_id
        ))
    except Exception as e:
        logger.error(e)
