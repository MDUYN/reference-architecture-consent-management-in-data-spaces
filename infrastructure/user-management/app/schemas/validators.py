import re

from app.models import User
from app.exceptions import ApiException
from app.configuration.constants import PROTECTED_KEYWORDS


def validate_user_username(value) -> None:
    user = User.query.filter_by(username=value).first()

    if user is not None:
        raise ApiException("Username: {} is already used".format(value))


def validate_user_email(value) -> None:
    user = User.query.filter_by(email=value).first()

    if user is not None:
        raise ApiException("Email: {} is already used".format(value))


def title_validator(value):

    if not re.match("^[a-zA-Z ]+\w*$", value):
        raise ApiException(
            "{} is not allowed, value must begin with a letter and only "
            "contains the characters of 0-9, A-Z, a-z and _".format(value)
        )


def slug_validator(value):
    if not re.match('^[-\w]+$', value):
        raise ApiException(
            "{} is not allowed, value must begin with a letter and "
            "only contains the characters of 0-9, A-Z, a-z and -".format(value)
        )


def protected_keywords_validator(value):

    if value.lower() in PROTECTED_KEYWORDS:
        raise ApiException("Value is not allowed, because it is protected")


def not_blank(value):

    if not value:
        raise ApiException("Data not provided")

    if isinstance(value, str) and not value.strip():
        raise ApiException("Data not provided")


def not_negative(value):

    if not (isinstance(value, int) or isinstance(value, float)):
        raise ApiException("Data is not a number")

    if value < 0:
        raise ApiException("Given number is negative")
