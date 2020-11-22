from marshmallow import Schema, fields, validate, post_load


class PolicySerializer(Schema):
    id = fields.Str(dump_only=True)
    data_provider_id = fields.Str(dump_only=True)
    data_set_id = fields.Str(dump_only=True)
    data_consumer_id = fields.Str(dump_only=True)
