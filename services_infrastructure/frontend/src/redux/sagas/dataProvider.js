import { call, put, takeLatest } from 'redux-saga/effects'
import {
    dataProviderListDataOwnersActions,
    dataProviderListDataSetsActions,
    dataProviderCreateDataOwnerActions,
    dataProviderCreateDataSetActions
} from "../actions";
import {
    REQUEST,
    DATA_PROVIDER_CREATE_DATA_SET,
    DATA_PROVIDER_LIST_DATA_SETS,
    DATA_PROVIDER_LIST_DATA_OWNERS,
    DATA_PROVIDER_CREATE_DATA_OWNER
} from "../types";
import { dataProviderCalls } from "../../services";

function* createDataOwner(action) {
    try {
        const response = yield call(dataProviderCalls.createDataOwner, action.id);
        yield put(dataProviderCreateDataOwnerActions.success(response));
    } catch (e) {
        yield put(dataProviderCreateDataOwnerActions.failure(e.response));
    }
}

export function* dataProviderCreateDataOwnerSaga() {
    yield takeLatest(DATA_PROVIDER_CREATE_DATA_OWNER[REQUEST], createDataOwner);
}

function* listDataOwners(action) {
    try {
        const response = yield call(dataProviderCalls.listDataOwners);
        yield put(dataProviderListDataOwnersActions.success(response));
    } catch (e) {
        yield put(dataProviderListDataOwnersActions.failure({error_message: "Could not load data owners"}));
    }
}

export function* dataProviderListDataOwnerSaga() {
    yield takeLatest(DATA_PROVIDER_LIST_DATA_OWNERS[REQUEST], listDataOwners);
}

function* createDataSet(action) {
    try {
        const response = yield call(
            dataProviderCalls.createDataSet,
            action.id,
            action.dataCategory,
            action.dataOwners
        );
        yield put(dataProviderCreateDataSetActions.success(response));
    } catch (e) {
        yield put(dataProviderCreateDataSetActions.failure(e.response));
    }
}

export function* dataProviderCreateDataSetSaga() {
    yield takeLatest(DATA_PROVIDER_CREATE_DATA_SET[REQUEST], createDataSet);
}

function* listDataSets(action) {
    try {
        const response = yield call(dataProviderCalls.listDataSets);
        yield put(dataProviderListDataSetsActions.success(response));
    } catch (e) {
        yield put(dataProviderListDataSetsActions.failure(e.response));
    }
}


export function* dataProviderListDataSetsSaga() {
    yield takeLatest(DATA_PROVIDER_LIST_DATA_SETS[REQUEST], listDataSets);
}
