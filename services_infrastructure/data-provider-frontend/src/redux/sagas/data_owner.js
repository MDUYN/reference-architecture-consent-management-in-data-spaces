import { call, put, takeLatest } from 'redux-saga/effects'
import {listDataOwnersActions, createDataOwnerActions} from "../actions";
import {REQUEST, CREATE_DATA_OWNER, LIST_DATA_OWNERS} from "../types";
import { dataOwnerCalls } from "../../services";

function* createDataOwner(action) {
    try {
        const response = yield call(dataOwnerCalls.createDataOwner, action.id);
        yield put(createDataOwnerActions.success(response));
    } catch (e) {
        yield put(createDataOwnerActions.failure(e.response));
    }
}

export function* createDataOwnerSaga() {
    yield takeLatest(CREATE_DATA_OWNER[REQUEST], createDataOwner);
}

function* listDataOwners(action) {
    try {
        const response = yield call(dataOwnerCalls.listDataOwners);
        console.log(response);
        yield put(listDataOwnersActions.success(response));
    } catch (e) {
        yield put(listDataOwnersActions.failure(e.response));
    }
}


export function* listDataOwnerSaga() {
    yield takeLatest(LIST_DATA_OWNERS[REQUEST], listDataOwners);
}
