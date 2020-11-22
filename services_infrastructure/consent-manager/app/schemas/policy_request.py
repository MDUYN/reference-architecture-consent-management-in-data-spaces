from app.models import PolicyRequest
from marshmallow import Schema, fields, post_load
from app.schemas.policy_request_data_obligation import \
    PolicyRequestDataObligationDeserializer, \
    PolicyRequestDataObligationSerializer
from app.schemas.policy_request_data_permission import \
    PolicyRequestDataPermissionDeserializer, \
    PolicyRequestDataPermissionSerializer


class PolicyRequestDeserializer(Schema):

    data_consumer_id = fields.Str()
    request_data_permissions = fields.Nested(
        PolicyRequestDataPermissionDeserializer, many=True
    )
    request_data_obligations = fields.Nested(
        PolicyRequestDataObligationDeserializer, many=True
    )

    @post_load
    def create_policy_request(self, data, **kwargs):
        return PolicyRequest(**data)


class PolicyRequestSerializer(Schema):
    id = fields.Str()
    data_consumer_id = fields.Str()
    request_data_permissions = fields.Nested(
        PolicyRequestDataPermissionSerializer, many=True, dump_only=True
    )
    request_data_obligations = fields.Nested(
        PolicyRequestDataObligationSerializer, many=True, dump_only=True
    )


