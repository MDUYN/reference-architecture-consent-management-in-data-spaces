import { call, put, takeLatest } from 'redux-saga/effects'
import {createDataSetActions, listDataSetsActions} from "../actions";
import {REQUEST, CREATE_DATA_SET, LIST_DATA_SETS} from "../types";
import { dataSetCalls } from "../../services";

function* createDataSet(action) {
    try {
        const response = yield call(
            dataSetCalls.createDataSet,
            action.id,
            action.dataCategory,
            action.dataOwners
        );
        yield put(createDataSetActions.success(response));
    } catch (e) {
        yield put(createDataSetActions.failure(e.response));
    }
}

export function* createDataSetSaga() {
    yield takeLatest(CREATE_DATA_SET[REQUEST], createDataSet);
}

function* listDataSets(action) {
    try {
        const response = yield call(dataSetCalls.listDataSets);
        yield put(listDataSetsActions.success(response));
    } catch (e) {
        yield put(listDataSetsActions.failure(e.response));
    }
}


export function* listDataSetsSaga() {
    yield takeLatest(LIST_DATA_SETS[REQUEST], listDataSets);
}
