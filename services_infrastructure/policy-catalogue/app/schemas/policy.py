from marshmallow import Schema, fields, validate, post_load


class PolicySerializer(Schema):
    id = fields.Int(dump_only=True)
    dataProviderId = fields.Str(dump_only=True)
    dataSetId = fields.Str(dump_only=True)
    content = fields.Str(dump_only=True)

