from marshmallow import Schema, fields


class ConsentManagerDeserializer(Schema):
    id = fields.Str()


class ConsentManagerSerializer(Schema):
    id = fields.Str(dump_only=True)

