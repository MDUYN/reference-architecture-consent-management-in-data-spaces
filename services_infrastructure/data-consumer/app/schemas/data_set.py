from marshmallow import Schema, fields


class DataSetDeserializer(Schema):
    id = fields.Str()


class DataSetSerializer(Schema):
    id = fields.Str(dump_only=True)

