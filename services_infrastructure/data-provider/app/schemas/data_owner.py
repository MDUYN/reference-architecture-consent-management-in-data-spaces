from marshmallow import Schema, fields, post_load

from app.schemas.validators import validate_data_owner_id
from app.models import DataOwner


class DataOwnerDeserializer(Schema):
    """
    Class DataOwnerDeserializer: deserializer for Data Owner instance.
    """

    id = fields.UUID(required=True, validate=[validate_data_owner_id])

    @post_load
    def create_data_owner(self, data, **kwargs):
        data_owner = DataOwner(data_owner_id=str(data.get('id')))
        return data_owner


class DataOwnerSerializer(Schema):
    """
    Serializer for a data owner
    """
    id = fields.UUID()
