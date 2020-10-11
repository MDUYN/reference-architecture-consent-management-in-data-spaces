from marshmallow import Schema, fields
from marshmallow_enum import EnumField

from app.schemas.validators import not_blank
from app.models import DataCategory


class DataObligationDeserializer(Schema):
    """
    Deserializer for Data Permission instance.
    """
    attribute_id = fields.String(required=True)
    attribute_constraint = fields.String(required=True)
    data_category = EnumField(
        DataCategory, required=True, validate=[not_blank]
    )


class DataObligationSerializer(Schema):
    """
    Serializer for a data permission
    """
    id = fields.UUID()
    attribute_id = fields.String()
    attribute_constraint = fields.String()
    data_category = EnumField(DataCategory, by_value=True)

