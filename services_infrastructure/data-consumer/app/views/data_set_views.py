import logging
from flask import Blueprint, request, jsonify
from app.models import DataSet
from app.extensions import db
from app.schemas import DataSetDeserializer, DataSetSerializer

logger = logging.getLogger(__name__)
blueprint = Blueprint('algorithms', __name__)


@blueprint.route('/data-sets', methods=['post'])
def create_data_set():
    logger.info("create_data_set service call")
    json_data = request.get_json()

    try:
        deserializer = DataSetDeserializer()
        data_set = deserializer.load(json_data)
        data_set.save()
        db.session.commit()

        serializer = DataSetSerializer()

        return jsonify(serializer.dump(data_set)), 200
    finally:
        db.session.commit()


@blueprint.route('/data-sets', methods=['GET'])
def list_data_sets():
    logger.info("list_data_sets service call")

    try:
        data_sets = DataSet.query.all()
        serializer = DataSetSerializer()
        return jsonify(serializer.dump(data_sets, many=True)), 200
    finally:
        db.session.commit()


@blueprint.route('/policies/<string:data_set_id>/', methods=['DELETE'])
def delete_data_set(data_set_id):
    logger.info("delete_data_set service call")

    try:
        data_set = DataSet.query.filter_by(id=data_set_id).first_or_404(
            "Policy not found"
        )
        data_set.delete()
        db.session.commit()
        return '', 204
    finally:
        db.session.commit()
