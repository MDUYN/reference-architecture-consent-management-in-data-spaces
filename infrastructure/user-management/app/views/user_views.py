from flask import Blueprint, request, jsonify

from app.exceptions import ApiException
from app.extensions import logger
from app.models import User
from app.schemas.user import UserDeserializer
from app.extensions import db

blueprint = Blueprint('users', __name__)


@blueprint.route('/users', methods=['POST'])
def create_user():
    logger.error("create_user service call")

    json_data = request.get_json()

    if not json_data:
        raise ApiException("No data provided")

    # Form the user
    user_schema = UserDeserializer()
    user = user_schema.load(json_data)

    # Save the user
    user.save()
    db.session.commit()

    # Return a json response
    return jsonify(user_schema.dump(user)), 201


@blueprint.route('/users', methods=['GET'])
def list_users():
    logger.error("get_user service call")

    # Retrieve all users
    user_schema = UserDeserializer()
    users = User.query.all()

    # Return a json response
    return jsonify(user_schema.dump(users, many=True)), 200
