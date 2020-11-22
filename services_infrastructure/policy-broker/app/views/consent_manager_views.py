import logging
from flask import Blueprint

logger = logging.getLogger(__name__)
blueprint = Blueprint('consent_managers', __name__)


@blueprint.route('/register', methods=['POST'])
def register_consent_manager():
    pass


@blueprint.route('/selection', methods=['POST'])
def get_selection():
    pass
