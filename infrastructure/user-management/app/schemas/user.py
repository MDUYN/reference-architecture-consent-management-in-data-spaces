from marshmallow import Schema, fields, validate, post_load

from app.schemas.validators import protected_keywords_validator, \
    slug_validator, validate_user_username, not_blank, validate_user_email
from app.configuration.constants import MAX_LENGTH_SLUG, MIN_LENGTH_SLUG, \
    MAX_LENGTH_PASSWORD, MIN_LENGTH_PASSWORD
from app.models import User
from app.schemas.user_profile import UserProfileDeserializer


class UserDeserializer(Schema):
    """
    Class DeveloperDeserializer: deserializer for Developer instance.
    """

    username = fields.Str(
        required=True,
        validate=[
            protected_keywords_validator,
            validate.Length(min=MIN_LENGTH_SLUG, max=MAX_LENGTH_SLUG),
            slug_validator,
            validate_user_username
        ]
    )
    email = fields.Email(
        validate=[
            not_blank,
            validate_user_email
        ], required=True)
    profile = fields.Nested(UserProfileDeserializer(many=False), required=True)
    password = fields.Str(
        required=True,
        validate=[
            validate.Length(
                min=MIN_LENGTH_PASSWORD,
                max=MAX_LENGTH_PASSWORD
            )
        ],
        load_only=True
    )
    registered_on = fields.DateTime(dump_only=True)

    @post_load
    def create_user(self, data, **kwargs):
        user = User(
            username=data.get('username'),
            email=data.get('email'),
            password=data.get('password')
        )
        user.profile = data.get('profile')
        return user
