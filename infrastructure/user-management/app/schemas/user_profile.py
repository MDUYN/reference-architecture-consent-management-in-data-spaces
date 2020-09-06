from marshmallow import Schema, fields, validate, post_load

from app.schemas.validators import not_blank
from app.configuration.constants import MAX_LENGTH_FIRST_NAME, \
    MAX_LENGTH_LAST_NAME, MIN_LENGTH_FIRST_NAME, MIN_LENGTH_LAST_NAME
from app.models import UserProfile


class UserProfileDeserializer(Schema):
    first_name = fields.String(
        validate=[
            not_blank,
            validate.Length(
                min=MIN_LENGTH_FIRST_NAME,
                max=MAX_LENGTH_FIRST_NAME
            )
        ],
        required=True
    )
    last_name = fields.String(
        validate=[
            not_blank,
            validate.Length(
                min=MIN_LENGTH_LAST_NAME,
                max=MAX_LENGTH_LAST_NAME
            )
        ],
        required=True
    )

    @post_load
    def create_user_profile(self, data, **kwargs):
        return UserProfile(
            first_name=data.get('first_name'),
            last_name=data.get('last_name')
        )
