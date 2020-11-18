import logging
from flask import Blueprint, request

from app.models import Policy
from app.extensions import db


logger = logging.getLogger(__name__)
blueprint = Blueprint('algorithms', __name__)


@blueprint.route('/policies/data-provider/<string:data_provider_id>/data-set/<string:data_set_id>/data-consumer/{string:data_consumer_id}', methods=['post'])
def create_policy(data_provider_id, data_set_id, data_consumer_id):
    logger.info("create_policy service call")
    policy = Policy(
        data_provider_id=data_provider_id,
        data_set_id=data_set_id,
        data_consumer_id=data_consumer_id
    )

    policy_content = request.files['file']
    print(policy_content)

    policy.save()
    db.session.commit()



@blueprint.route('/policies/<string:policy_id>/', methods=['GET'])
def retrieve_policy(policy_id):
    logger.info("list_organization_algorithms service call")
    pass


@blueprint.route('/policies/<string:policy_id>/', methods=['DELETE'])
def delete_policy(policy_id):
    logger.info("delete_policy service call")

    pass
