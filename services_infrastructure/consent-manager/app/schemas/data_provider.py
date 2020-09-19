from marshmallow import Schema, fields, post_load

from app.schemas.validators import validate_data_provider_id
from app.models import DataProvider


class DataProviderDeserializer(Schema):
    """
    Deserializer for Data Provider instance.
    """
    id = fields.UUID(required=True, validate=[validate_data_provider_id])

    @post_load
    def create_data_owner(self, data, **kwargs):
        data_owner = DataProvider(str(data.get('id')))
        return data_owner


class DataProviderSerializer(Schema):
    """
    Serializer for a data provider
    """
    id = fields.UUID()
