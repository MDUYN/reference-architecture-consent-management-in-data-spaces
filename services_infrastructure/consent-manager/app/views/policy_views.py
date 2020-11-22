import logging
import requests
from flask import Blueprint, request, current_app, jsonify

from app.schemas.policy_request import PolicyRequestDeserializer, \
    PolicyRequestSerializer
from app.extensions import db
from app.models import DataSet, DataProvider, PolicyRequest
from app.configuration.constants import DATA_CONSUMER_SERVICE_ADDRESS

blueprint = Blueprint('policies', __name__)
logger = logging.getLogger(__name__)


@blueprint.route(
    '/policy/<string:data_provider_id>/data-sets/<string:data_set_id>',
    methods=['POST']
)
def create_data_policy_requests(data_provider_id, data_set_id):
    json_data = request.get_json()

    try:
        data_provider = DataProvider.query\
            .filter_by(id=data_provider_id)\
            .first_or_404("Data provider not found")

        data_set = DataSet.query\
            .filter_by(id=data_set_id)\
            .first_or_404("Data ser not found")

        deserializer = PolicyRequestDeserializer()
        policy_request = deserializer.load(json_data)
        policy_request.data_provider = str(data_provider.id)
        policy_request.data_set = str(data_set.id)
        policy_request.save()

        serializer = PolicyRequestSerializer()
        return jsonify(serializer.dump(policy_request)), 201
    finally:
        db.session.close()


@blueprint.route(
    '/policy-requests/<string:data_set_id>', methods=['GET']
)
def list_data_policy_requests(data_set_id):

    try:
        policy_requests = PolicyRequest.query\
            .filter_by(data_set_id=data_set_id)\
            .all()
        serializer = PolicyRequestSerializer()
        return jsonify(serializer.dump(policy_requests)), 200
    finally:
        db.session.close()


@blueprint.route(
    '/policy-requests/<string:policy_request_id>',
    methods=['POST']
)
def accept_data_policy_requests(policy_request_id):

    try:
        policy_request = PolicyRequest.query\
            .filter_by(id=policy_request_id)\
            .first_or_404("policy_request_not_found")

        requests.post(
            "/policies/data-provider/{}/data-set/{}/data-consumer/{}".format(
                current_app.config[DATA_CONSUMER_SERVICE_ADDRESS],
                policy_request.data_provider.id,
                policy_request.data_set.id,
                policy_request.data_set.data_provider.id
            )
        )
        return "Policy request accepted", 200
    finally:
        db.session.close()


@blueprint.route(
    '/policy-requests/<string:policy_request_id>',
    methods=['DELETE']
)
def decline_data_policy_requests(policy_request_id):

    try:
        policy_request = PolicyRequest.query\
            .filter_by(id=policy_request_id)\
            .first_or_404("policy_request_not_found")
        policy_request.delete()

        return "", 204
    finally:
        db.session.close()
