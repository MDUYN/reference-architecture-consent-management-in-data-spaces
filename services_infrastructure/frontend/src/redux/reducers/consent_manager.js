import {
    REQUEST,
    FAILURE,
    SUCCESS,
    CONSENT_MANAGER_CREATE_DATA_SET,
    CONSENT_MANAGER_CREATE_DATA_PROVIDER,
    CONSENT_MANAGER_CREATE_DATA_OWNER,
    CONSENT_MANAGER_LIST_DATA_SETS,
    CONSENT_MANAGER_LIST_DATA_PROVIDERS,
    CONSENT_MANAGER_LIST_DATA_OWNERS,
    CONSENT_MANAGER_LIST_DATA_OWNER_DATA_SETS,
    CONSENT_MANAGER_LIST_PERMISSIONS,
    CONSENT_MANAGER_LIST_OBLIGATIONS,
    CONSENT_MANAGER_CREATE_DATA_PERMISSION, CONSENT_MANAGER_CREATE_DATA_OBLIGATION
} from "../types";
import {reduceError, reduceClearErrors} from "./index";

const initialState = {
    dataOwner: {
        permissions: [],
        obligations: [],
        obligationCreated: false,
        permissionCreated: false
    },
    dataOwners: {
        items: [],
        dataOwnerCreated: false,
        error: false
    },
    dataProviders: {
        items: [],
        dataProviderCreated: false,
        error: false
    },
    dataSets: {
        items: [],
        dataSetCreated: false,
        error: false
    },
};


export default function consentManagerReducer(state = initialState, action) {
    switch (action.type) {
        case CONSENT_MANAGER_LIST_DATA_OWNERS[REQUEST]:
            return {...state, dataOwners: {items: [], dataOwnerCreated: false, error: false}};
        case CONSENT_MANAGER_LIST_DATA_OWNERS[FAILURE]:
            return {...state, dataOwners: reduceError(state.dataOwners, action)};
        case CONSENT_MANAGER_LIST_DATA_OWNERS[SUCCESS]:
            return {...state, dataOwners: {...state.dataOwners, items: action.response}}
        case CONSENT_MANAGER_CREATE_DATA_OWNER[REQUEST]:
            return {...state, dataOwners: {...state.dataOwners, dataOwnerCreated: false}}
        case CONSENT_MANAGER_CREATE_DATA_OWNER[SUCCESS]:
            return {...state, dataOwners: {...state.dataOwners, dataOwnerCreated: true}}
        case CONSENT_MANAGER_CREATE_DATA_OWNER[FAILURE]:
            return {...state, dataOwners: reduceError(state.dataOwners, action)}
        case CONSENT_MANAGER_LIST_DATA_PROVIDERS[REQUEST]:
            return {...state, dataProviders: {items: [], dataProviderCreated: false, error: false}};
        case CONSENT_MANAGER_LIST_DATA_PROVIDERS[FAILURE]:
            return {...state, dataProviders: reduceError(state.dataProviders, action)};
        case CONSENT_MANAGER_LIST_DATA_PROVIDERS[SUCCESS]:
            return {...state, dataProviders: {...state.dataProviders, items: action.response}}
        case CONSENT_MANAGER_CREATE_DATA_PROVIDER[REQUEST]:
            return {...state, dataProviders: {...state.dataProviders, dataProviderCreated: false}}
        case CONSENT_MANAGER_CREATE_DATA_PROVIDER[SUCCESS]:
            return {...state, dataProviders: {...state.dataProviders, dataProviderCreated: true}}
        case CONSENT_MANAGER_CREATE_DATA_PROVIDER[FAILURE]:
            return {...state, dataProviders: reduceError(state.dataProviders, action)}
        case CONSENT_MANAGER_LIST_DATA_SETS[REQUEST]:
            return {...state, dataSets: {items: [], dataSetCreated: false, error: false}};
        case CONSENT_MANAGER_LIST_DATA_SETS[FAILURE]:
            return {...state, dataSets: reduceError(state.dataSets, action)};
        case CONSENT_MANAGER_LIST_DATA_SETS[SUCCESS]:
            return {...state, dataSets: {...state.dataSets, items: action.response}}
        case CONSENT_MANAGER_CREATE_DATA_SET[REQUEST]:
            return {...state, dataSets: {...state.dataSets, dataSetCreated: false}}
        case CONSENT_MANAGER_CREATE_DATA_SET[SUCCESS]:
            return {...state, dataSets: {...state.dataSets, dataSetCreated: true}}
        case CONSENT_MANAGER_CREATE_DATA_SET[FAILURE]:
            return {...state, dataSets: {...reduceError(state.dataSets, action)}, dataSetCreated: false}
        case CONSENT_MANAGER_LIST_DATA_OWNER_DATA_SETS[REQUEST]:
            return {...state, dataSets: {items: [], dataSetCreated: false, error: false}}
        case CONSENT_MANAGER_LIST_DATA_OWNER_DATA_SETS[FAILURE]:
            return {...state, dataSets: {...reduceError(state.dataSets, action)}, dataSetCreated: false};
        case CONSENT_MANAGER_LIST_DATA_OWNER_DATA_SETS[SUCCESS]:
            return {...state, dataSets: {items: action.response, dataSetCreated: false, error: false}};
        case CONSENT_MANAGER_LIST_PERMISSIONS[REQUEST]:
            return {...state, dataOwner: {...state.dataOwner, permissions: []}};
        case CONSENT_MANAGER_LIST_PERMISSIONS[SUCCESS]:
            return {...state, dataOwner: {...state.dataOwner, permissions: action.response}};
        case CONSENT_MANAGER_LIST_PERMISSIONS[FAILURE]:
            return {...state, dataOwner: {permissions: [], obligations: [], ...reduceError(state.dataOwner, action)}};
        case CONSENT_MANAGER_LIST_OBLIGATIONS[REQUEST]:
            return {...state, dataOwner: {...state.dataOwner, obligations: []}};
        case CONSENT_MANAGER_LIST_OBLIGATIONS[SUCCESS]:
            return {...state, dataOwner: {...state.dataOwner, obligations: action.response}};
        case CONSENT_MANAGER_LIST_OBLIGATIONS[FAILURE]:
            return {...state, dataOwner: {permissions: [], obligations: [], ...reduceError(state.dataOwner, action)}};
        case CONSENT_MANAGER_CREATE_DATA_PERMISSION[REQUEST]:
            return {...state, dataOwner: {...state.dataOwner, permissionCreated: false}};
        case CONSENT_MANAGER_CREATE_DATA_PERMISSION[SUCCESS]:
            return {...state, dataOwner: {...state.dataOwner, permissionCreated: true}};
        case CONSENT_MANAGER_CREATE_DATA_PERMISSION[FAILURE]:
            return {...state, dataOwner: {...state.dataOwner, permissionCreated: false, ...reduceError(state.dataOwner, action)}};
        case CONSENT_MANAGER_CREATE_DATA_OBLIGATION[REQUEST]:
            return {...state, dataOwner: {...state.dataOwner, obligationCreated: false}};
        case CONSENT_MANAGER_CREATE_DATA_OBLIGATION[SUCCESS]:
            return {...state, dataOwner: {...state.dataOwner, obligationCreated: true}};
        case CONSENT_MANAGER_CREATE_DATA_OBLIGATION[FAILURE]:
            return {...state, dataOwner: {...state.dataOwner, obligationCreated: false, ...reduceError(state.dataOwner, action)}};
        default:
            return state;
    }
};
