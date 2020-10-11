from marshmallow import Schema, fields

from app.schemas.validators import validate_data_consumer_exists
from app.schemas.data_sets import DataSetSerializer
from app.schemas.data_provider import DataProviderSerializer


class PolicyDeserializer(Schema):
    data_consumer = fields.String(
        required=True, validate=[validate_data_consumer_exists]
    )


class DataPermissionSerializer(Schema):
    id = fields.Integer()
    data_consumer = fields.String()
    data_set = fields.Nested(DataSetSerializer())
    data_provider = fields.Nested(DataProviderSerializer())
    attribute_constraint = fields.String()
