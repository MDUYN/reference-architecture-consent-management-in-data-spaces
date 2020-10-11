from app.models import DataSet, DataPermission
from xml.etree.ElementTree import Element, SubElement, tostring


class PolicyFormer:

    def form_policy(self, data_set: DataSet):
        data_category = data_set.data_category

        for data_owner in data_set.data_owners:
            data_permissions = DataPermission.query.filter_by(
                data_category=data_category, data_owner=data_owner
            ).all()
            print(data_permissions)





