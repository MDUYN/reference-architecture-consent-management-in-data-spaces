from app.models import DataOwner, DataSet
from app.exceptions import ApiException


def validate_data_owner_id(value) -> None:
    data_owner = DataOwner.query.filter_by(id=str(value)).first()

    if data_owner is not None:
        raise ApiException("Data Owner id: {} is already used".format(value))


def validate_data_set_id(value) -> None:
    data_set = DataSet.query.filter_by(id=str(value)).first()

    if data_set is not None:
        raise ApiException("Data Set id: {} is already used".format(value))


def validate_data_owner_exist(value) -> None:

    if type(value) == list:

        for entry in value:
            data_owner = DataOwner.query.filter_by(id=str(entry)).first()

            if data_owner is None:
                raise ApiException(
                    "Data Owner id: {} does not exist".format(value))
    else:
        data_owner = DataOwner.query.filter_by(id=str(value)).first()

        if data_owner is None:
            raise ApiException(
                "Data Owner id: {} does not exist".format(value))


def not_blank(value):

    if not value:
        raise ApiException("Data not provided")

    if isinstance(value, str) and not value.strip():
        raise ApiException("Data not provided")
