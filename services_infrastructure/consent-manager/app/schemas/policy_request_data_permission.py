from marshmallow import Schema, fields, post_load

from app.models import PolicyRequestDataPermission


class PolicyRequestDataPermissionDeserializer(Schema):
    """
    Deserializer for Data Permission instance.
    """
    attribute_id = fields.String(required=True)
    attribute_constraint = fields.String(required=True)

    @post_load
    def create_policy_request_data_obligation(self, data, **kwargs):
        return PolicyRequestDataPermission(**data)


class PolicyRequestDataPermissionSerializer(Schema):
    """
    Serializer for a data permission
    """
    id = fields.UUID()
    attribute_id = fields.String()
    attribute_constraint = fields.String()
