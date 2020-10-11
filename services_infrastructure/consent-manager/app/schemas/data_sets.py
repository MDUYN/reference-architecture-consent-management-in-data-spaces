from marshmallow import Schema, fields, post_load
from marshmallow_enum import EnumField

from app.schemas.validators import validate_data_set_id
from app.models import DataSet, DataCategory, DataOwner
from app.schemas.validators import not_blank, validate_data_owner_exist
from app.schemas.data_owner import DataOwnerSerializer


class DataSetDeserializer(Schema):
    """
    Deserializer for Data Set instance.
    """

    id = fields.UUID(required=True, validate=[validate_data_set_id])
    data_category = EnumField(
        DataCategory, required=True, validate=[not_blank]
    )
    data_owners = fields.List(
        fields.String, required=True, validate=[validate_data_owner_exist]
    )

    @post_load
    def create_data_set(self, data, **kwargs):
        data_set = DataSet(
            data_set_id=str(data.get('id')),
            data_category=data.get('data_category')
        )

        for data_owner_id in data['data_owners']:
            data_set.data_owners.append(
                DataOwner.query.filter_by(id=data_owner_id).first()
            )
        return data_set


class DataSetSerializer(Schema):
    """
    Serializer for a data set instance
    """
    id = fields.UUID()
    data_category = EnumField(DataCategory)
    data_owners = fields.Nested(
        DataOwnerSerializer(), required=True, many=True
    )
