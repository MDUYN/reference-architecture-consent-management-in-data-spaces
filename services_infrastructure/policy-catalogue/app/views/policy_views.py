import os
import logging
from flask import Blueprint, request, jsonify, send_file
from werkzeug.utils import secure_filename

from app.models import Policy
from app.extensions import db
from app.configuration.settings import POLICIES_DIR
from app.schemas import PolicySerializer

logger = logging.getLogger(__name__)
blueprint = Blueprint('algorithms', __name__)


@blueprint.route('/policies/data-provider/<string:data_provider_id>/data-set/<string:data_set_id>/data-consumer/<string:data_consumer_id>', methods=['post'])
def create_policy(data_provider_id, data_set_id, data_consumer_id):
    logger.info("create_policy service call")
    policy = Policy(
        data_provider_id=data_provider_id,
        data_set_id=data_set_id,
        data_consumer_id=data_consumer_id
    )

    policy_content = request.files['policy']
    policy_content.save(
        os.path.join(POLICIES_DIR, secure_filename(policy_content.filename))
    )
    policy.policy_content_path = os.path.join(
        POLICIES_DIR,
        secure_filename(policy_content.filename)
    )
    policy.save()
    db.session.commit()

    serializer = PolicySerializer()

    return jsonify(serializer.dump(policy)), 200


@blueprint.route('/policies/<string:data_set_id>/', methods=['GET'])
def list_policies_data_sets(data_set_id):

    try:
        policies = Policy.query.filter_by(data_set_id=data_set_id).all()
        serializer = PolicySerializer()
        return jsonify(serializer.dump(policies, many=True)), 200
    finally:
        db.session.close()


@blueprint.route(
    '/policies/data-consumer/<string:data_consumer_id>/', methods=['GET']
)
def list_policies_data_consumer(data_consumer_id):
    try:
        policies = Policy.query\
            .filter_by(data_consumer_id=data_consumer_id).all()
        serializer = PolicySerializer()
        return jsonify(serializer.dump(policies, many=True)), 200
    finally:
        db.session.close()


@blueprint.route(
    '/policies/data-provider/<string:data_provider_id>/', methods=['GET']
)
def list_policies_data_provider(data_provider_id):
    try:
        policies = Policy.query\
            .filter_by(data_provider_id=data_provider_id).all()
        serializer = PolicySerializer()
        return jsonify(serializer.dump(policies, many=True)), 200
    finally:
        db.session.close()


@blueprint.route('/policies/<string:policy_id>/', methods=['GET'])
def retrieve_policy(policy_id):
    logger.info("list_organization_algorithms service call")

    try:
        policy = Policy.query.filter_by(id=policy_id).first_or_404(
            "Policy not found"
        )

        return send_file(policy.policy_content_path), 200
    finally:
        db.session.close()


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
        db.session.close()
