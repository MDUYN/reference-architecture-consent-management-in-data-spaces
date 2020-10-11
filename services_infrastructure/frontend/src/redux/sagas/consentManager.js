import {call, put, takeLatest } from 'redux-saga/effects'
import {
    consentManagerListDataSetsActions,
    consentManagerListDataProvidersActions,
    consentManagerCreateDataProviderActions,
    consentManagerCreateDataSetActions,
    consentManagerCreateDataOwnerActions,
    consentManagerListDataOwnerDataSetsActions,
    consentManagerListDataOwnersActions,
    consentManagerListDataOwnerObligationsActions,
    consentManagerListDataOwnerPermissionsActions,
    consentManagerCreateDataOwnerObligationActions,
    consentManagerCreateDataOwnerPermissionActions
} from "../actions";
import {
    REQUEST,
    CONSENT_MANAGER_LIST_DATA_SETS,
    CONSENT_MANAGER_LIST_DATA_PROVIDERS,
    CONSENT_MANAGER_CREATE_DATA_PROVIDER,
    CONSENT_MANAGER_CREATE_DATA_SET,
    CONSENT_MANAGER_CREATE_DATA_OWNER,
    CONSENT_MANAGER_LIST_DATA_OWNER_DATA_SETS,
    CONSENT_MANAGER_LIST_DATA_OWNERS,
    CONSENT_MANAGER_LIST_PERMISSIONS,
    CONSENT_MANAGER_LIST_OBLIGATIONS,
    CONSENT_MANAGER_CREATE_DATA_OBLIGATION, CONSENT_MANAGER_CREATE_DATA_PERMISSION
} from "../types";
import { consentManagerCalls } from "../../services";

function* consentManagerListDataSets(action) {
    try {
        const response = yield call(consentManagerCalls.listDataSet, action.dataProviderId);
        yield put(consentManagerListDataSetsActions.success(response));
    } catch (e) {
        yield put(consentManagerListDataSetsActions.failure(e.response));
    }
}

export function* consentManagerListDataSetsSaga() {
    yield takeLatest(CONSENT_MANAGER_LIST_DATA_SETS[REQUEST], consentManagerListDataSets);
}

function* consentManagerListDataOwnersWorker(action) {
    try {
        const response = yield call(consentManagerCalls.listDataOwners);
        yield put(consentManagerListDataOwnersActions.success(response));
    } catch (e) {
        yield put(consentManagerListDataOwnersActions.failure(e));
    }
}

export function* consentManagerListDataOwnersSaga() {
    yield takeLatest(CONSENT_MANAGER_LIST_DATA_OWNERS[REQUEST], consentManagerListDataOwnersWorker);
}

function* consentManagerListDataProvidersWorker(action) {
    try{
        const response = yield call(consentManagerCalls.listDataProviders);
        yield put(consentManagerListDataProvidersActions.success(response));
    } catch (e) {
        yield put(consentManagerListDataProvidersActions.failure(e.response));
    }
}

export function* consentManagerListDataProvidersSaga() {
    yield takeLatest(CONSENT_MANAGER_LIST_DATA_PROVIDERS[REQUEST], consentManagerListDataProvidersWorker)
}

function* consentManagerCreateDataProviderWorker(action) {
    try {
        const response = yield call(consentManagerCalls.createDataProvider, action.id);
        yield put(consentManagerCreateDataProviderActions.success(response));
    } catch (e) {
        yield put(consentManagerCreateDataProviderActions.failure(e));
    }
}

export function* consentManagerCreateDataProviderSaga() {
    yield takeLatest(CONSENT_MANAGER_CREATE_DATA_PROVIDER[REQUEST], consentManagerCreateDataProviderWorker)
}


function* consentManagerCreateDataOwnerWorker(action) {
    try {
        const response = yield call(consentManagerCalls.createDataOwner, action.id);
        yield put(consentManagerCreateDataOwnerActions.success(response));
    } catch (e) {
        yield put(consentManagerCreateDataOwnerActions.failure(e));
    }
}

export function* consentManagerCreateDataOwnerSaga() {
    yield takeLatest(CONSENT_MANAGER_CREATE_DATA_OWNER[REQUEST], consentManagerCreateDataOwnerWorker);
}

function* consentManagerCreateDataSetWorker(action) {
    try {
        const response = yield call(
            consentManagerCalls.createDataSet,
            action.dataProviderId,
            action.dataSetId,
            action.dataCategory,
            action.dataOwners
        );
        yield put(consentManagerCreateDataSetActions.success(response));
    } catch (e) {
        yield put(consentManagerCreateDataSetActions.failure(e));
    }
}

export function* consentManagerCreateDataSetSaga() {
    yield takeLatest(CONSENT_MANAGER_CREATE_DATA_SET[REQUEST], consentManagerCreateDataSetWorker);
}

function* consentManagerListDataOwnerDataSetsWorker(action) {
    try{
        const response = yield call(consentManagerCalls.listDataOwnerDataSets, action.dataOwnerId);
        yield put(consentManagerListDataOwnerDataSetsActions.success(response));
    } catch (e) {
        yield put(consentManagerListDataOwnerDataSetsActions.failure(e));
    }
}

export function* consentManagerListDataOwnerDataSets() {
    yield takeLatest(CONSENT_MANAGER_LIST_DATA_OWNER_DATA_SETS[REQUEST], consentManagerListDataOwnerDataSetsWorker);
}


function* consentManagerListDataOwnerPermissionsWorker(action) {
    try{
        const response = yield call(consentManagerCalls.listDataOwnerPermissions, action.dataOwnerId, action.dataCategory);
        yield put(consentManagerListDataOwnerPermissionsActions.success(response));
    } catch (e) {
        yield put(consentManagerListDataOwnerPermissionsActions.failure(e));
    }
}

export function* consentManagerListDataOwnerPermissions() {
    yield takeLatest(CONSENT_MANAGER_LIST_PERMISSIONS[REQUEST], consentManagerListDataOwnerPermissionsWorker);
}

function* consentManagerListDataOwnerObligationsWorker(action) {
    try{
        const response = yield call(consentManagerCalls.listDataOwnerObligations, action.dataOwnerId, action.dataCategory);
        yield put(consentManagerListDataOwnerObligationsActions.success(response));
    } catch (e) {
        yield put(consentManagerListDataOwnerObligationsActions.failure(e));
    }
}

export function* consentManagerListDataOwnerObligations() {
    yield takeLatest(CONSENT_MANAGER_LIST_OBLIGATIONS[REQUEST], consentManagerListDataOwnerObligationsWorker);
}

function* consentManagerCreateObligationWorker(action) {
    try{
        const response = yield call(
            consentManagerCalls.createDataOwnerObligation,
            action.dataOwnerId,
            action.attributeId,
            action.attributeConstraint,
            action.dataCategory
        );
        yield put(consentManagerCreateDataOwnerObligationActions.success(response));
    } catch (e) {
        yield put(consentManagerCreateDataOwnerObligationActions.failure(e));
    }
}

export function* consentManagerCreateObligation() {
    yield takeLatest(CONSENT_MANAGER_CREATE_DATA_OBLIGATION[REQUEST], consentManagerCreateObligationWorker);
}

function* consentManagerCreateDataOwnerPermissionWorker(action) {
    try{
        const response = yield call(
            consentManagerCalls.createDataOwnerPermission,
            action.dataOwnerId,
            action.attributeId,
            action.attributeConstraint,
            action.dataCategory
        );
        yield put(consentManagerCreateDataOwnerPermissionActions.success(response));
    } catch (e) {
        yield put(consentManagerCreateDataOwnerPermissionActions.failure(e));
    }
}

export function* consentManagerCreatePermission() {
    yield takeLatest(CONSENT_MANAGER_CREATE_DATA_PERMISSION[REQUEST], consentManagerCreateDataOwnerPermissionWorker);
}
