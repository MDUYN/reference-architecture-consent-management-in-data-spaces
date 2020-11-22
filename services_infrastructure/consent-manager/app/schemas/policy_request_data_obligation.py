from marshmallow import Schema, fields, post_load
from app.models import PolicyRequestDataObligation


class PolicyRequestDataObligationDeserializer(Schema):
    """
    Deserializer for Data Permission instance.
    """
    attribute_id = fields.String(required=True)
    attribute_constraint = fields.String(required=True)

    @post_load
    def create_policy_request_data_obligation(self, data, **kwargs):
        return PolicyRequestDataObligation(**data)


class PolicyRequestDataObligationSerializer(Schema):
    """
    Serializer for a data permission
    """
    id = fields.UUID()
    attribute_id = fields.String()
    attribute_constraint = fields.String()
