from marshmallow import Schema, fields


class PolicyDeserializer(Schema):
    id = fields.Str()


class PolicySerializer(Schema):
    id = fields.Str(dump_only=True)

