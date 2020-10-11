import {
    REQUEST,
    FAILURE,
    SUCCESS,
    DATA_PROVIDER_LIST_DATA_OWNERS,
    DATA_PROVIDER_CREATE_DATA_OWNER,
    DATA_PROVIDER_CLEAR_DATA_OWNER_ERRORS,
    DATA_PROVIDER_LIST_DATA_SETS,
    DATA_PROVIDER_CLEAR_DATA_SET_ERRORS,
    DATA_PROVIDER_RETRIEVE_DATA_SET,
    DATA_PROVIDER_CREATE_DATA_SET
} from "../types";

import {reduceError, reduceClearErrors} from "./index";

const initialState = {
    dataOwners: {
        items: [],
        dataOwnerCreated: false,
        error: false
    },
    dataSets: {
        items: [],
        dataSetCreated: false,
        error: false
    },
};

export default function dataProviderReducer(state = initialState, action) {
    switch (action.type) {
        case DATA_PROVIDER_CREATE_DATA_OWNER[REQUEST]:
            return {...state, dataOwners: {error: false, dataOwnerCreated: false}};
        case DATA_PROVIDER_CREATE_DATA_OWNER[FAILURE]:
            return {...state, dataOwners: reduceError(state.dataOwners, action)};
        case DATA_PROVIDER_CREATE_DATA_OWNER[SUCCESS]:
            return {...state, dataOwners: {...state.dataOwners, dataOwnerCreated: true, error: false}};
        case DATA_PROVIDER_LIST_DATA_OWNERS[SUCCESS]:
            return {...state, dataOwners:{items: action.response, error: false}};
        case DATA_PROVIDER_LIST_DATA_OWNERS[REQUEST]:
            return {...state, dataOwners: {items: [], dataOwnerCreated: false, error: false}};
        case DATA_PROVIDER_LIST_DATA_OWNERS[FAILURE]:
            return {...state, dataOwners: reduceError(state.dataOwners, action)};
        case DATA_PROVIDER_CREATE_DATA_SET[REQUEST]:
            return {...state, dataSets: {...state.dataSets, dataSetCreated: false, error: false}};
        case DATA_PROVIDER_CREATE_DATA_SET[FAILURE]:
            return {...state, dataSets: reduceError(state.dataSets, action)};
        case DATA_PROVIDER_CREATE_DATA_SET[SUCCESS]:
            return {...state, dataSets: {items: action.response, dataSetCreated: true, error: false}};
        case DATA_PROVIDER_LIST_DATA_SETS[REQUEST]:
            return {...state, dataSets: {items: [], error: false, dataSetCreated: false}};
        case DATA_PROVIDER_LIST_DATA_SETS[FAILURE]:
            return {...state, dataSets: reduceError(state.dataSets, action)}
        case DATA_PROVIDER_LIST_DATA_SETS[SUCCESS]:
            return {...state, dataSets: {items: action.response, dataSetCreated: false, error: false}};
        case DATA_PROVIDER_CLEAR_DATA_OWNER_ERRORS:
            return {...state, dataOwners: {...state.dataOwners, error: false}};
        case DATA_PROVIDER_CLEAR_DATA_SET_ERRORS:
            return {...state, dataSets: {...state.dataSets, error: false}};
        default:
            return state;
    }
};
