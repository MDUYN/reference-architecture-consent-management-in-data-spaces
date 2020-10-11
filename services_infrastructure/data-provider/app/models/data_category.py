from enum import Enum
from app.exceptions import ApiException


class DataCategory(Enum):
    energy_usage_data = 'energy_usage_data'
    energy_generation_data = 'energy_generation_data'
    energy_storage_data = 'energy_storage_data'

    @staticmethod
    def from_string(value: str):

        if isinstance(value, str):

            if value.lower() in ('energy_usage_data', 'usage_data', 'usage'):
                return DataCategory.energy_usage_data

            elif value.lower() in (
                    'energy_generation_data',
                    'generation_data',
                    'generation'
            ):
                return DataCategory.energy_generation_data

            elif value.lower() in (
                    'energy_storage_data',
                    'storage_data',
                    'storage'
            ):
                return DataCategory.energy_storage_data

        raise ApiException(
            "Could not convert value to a DataCategory"
        )

    def equals(self, other):

        if isinstance(other, Enum):
            return self.value == other.value
        else:

            try:
                time_unit = DataCategory.from_string(other)
                return time_unit == self
            except ApiException:
                pass

            return other == self.value
