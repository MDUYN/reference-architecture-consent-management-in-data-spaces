import {createAction} from './index';
import {
    SUCCESS,
    FAILURE,
    REQUEST,
    CONSENT_MANAGER_LIST_DATA_OWNERS,
    CONSENT_MANAGER_LIST_DATA_PROVIDERS,
    CONSENT_MANAGER_LIST_DATA_SETS,
    CONSENT_MANAGER_CREATE_DATA_OWNER,
    CONSENT_MANAGER_CREATE_DATA_PROVIDER,
    CONSENT_MANAGER_CREATE_DATA_SET,
    CONSENT_MANAGER_LIST_DATA_OWNER_DATA_SETS,
    CONSENT_MANAGER_LIST_PERMISSIONS,
    CONSENT_MANAGER_LIST_OBLIGATIONS, CONSENT_MANAGER_CREATE_DATA_OBLIGATION, CONSENT_MANAGER_CREATE_DATA_PERMISSION
} from "../types";

export const consentManagerListDataOwnersActions = {
    request: () => createAction(CONSENT_MANAGER_LIST_DATA_OWNERS[REQUEST], {}),
    success: (response) => createAction(CONSENT_MANAGER_LIST_DATA_OWNERS[SUCCESS], {response}),
    failure: (response) => createAction(CONSENT_MANAGER_LIST_DATA_OWNERS[FAILURE], {response})
};

export const consentManagerCreateDataOwnerActions = {
    request: (id) => createAction(CONSENT_MANAGER_CREATE_DATA_OWNER[REQUEST], {id: id}),
    success: (response) => createAction(CONSENT_MANAGER_CREATE_DATA_OWNER[SUCCESS], {response}),
    failure: (response) => createAction(CONSENT_MANAGER_CREATE_DATA_OWNER[FAILURE], {response})
};

export const consentManagerListDataProvidersActions = {
    request: () => createAction(CONSENT_MANAGER_LIST_DATA_PROVIDERS[REQUEST], {}),
    success: (response) => createAction(CONSENT_MANAGER_LIST_DATA_PROVIDERS[SUCCESS], {response}),
    failure: (response) => createAction(CONSENT_MANAGER_LIST_DATA_PROVIDERS[FAILURE], {response})
};

export const consentManagerCreateDataProviderActions = {
    request: (id) => createAction(CONSENT_MANAGER_CREATE_DATA_PROVIDER[REQUEST], {id: id}),
    success: (response) => createAction(CONSENT_MANAGER_CREATE_DATA_PROVIDER[SUCCESS], {response}),
    failure: (response) => createAction(CONSENT_MANAGER_CREATE_DATA_PROVIDER[FAILURE], {response})
}

export const consentManagerListDataSetsActions = {
    request: (dataProviderId) => createAction(CONSENT_MANAGER_LIST_DATA_SETS[REQUEST],
        {dataProviderId: dataProviderId}
        ),
    success: (response) => createAction(CONSENT_MANAGER_LIST_DATA_SETS[SUCCESS], {response}),
    failure: (response) => createAction(CONSENT_MANAGER_LIST_DATA_SETS[FAILURE], {response})
};

export const consentManagerCreateDataSetActions = {
    request: (dataProviderId, dataSetId, dataCategory, dataOwners) => createAction(
        CONSENT_MANAGER_CREATE_DATA_SET[REQUEST],
        {
            dataProviderId: dataProviderId,
            dataSetId: dataSetId,
            dataCategory: dataCategory,
            dataOwners: dataOwners
        }),
    success: (response) => createAction(CONSENT_MANAGER_CREATE_DATA_SET[SUCCESS], {response}),
    failure: (response) => createAction(CONSENT_MANAGER_CREATE_DATA_SET[FAILURE], {response})
}

export const consentManagerListDataOwnerDataSetsActions = {
    request: (dataOwnerId) => createAction(CONSENT_MANAGER_LIST_DATA_OWNER_DATA_SETS[REQUEST],
        {dataOwnerId: dataOwnerId}
        ),
    success: (response) => createAction(CONSENT_MANAGER_LIST_DATA_OWNER_DATA_SETS[SUCCESS], {response}),
    failure: (response) => createAction(CONSENT_MANAGER_LIST_DATA_OWNER_DATA_SETS[FAILURE], {response})
}


export const consentManagerListDataOwnerPermissionsActions = {
    request: (dataOwnerId, dataCategory) => createAction(CONSENT_MANAGER_LIST_PERMISSIONS[REQUEST], {dataOwnerId: dataOwnerId, dataCategory: dataCategory}),
    success: (response) => createAction(CONSENT_MANAGER_LIST_PERMISSIONS[SUCCESS], {response}),
    failure: (response) => createAction(CONSENT_MANAGER_LIST_PERMISSIONS[FAILURE], {response})
}

export const consentManagerListDataOwnerObligationsActions = {
    request: (dataOwnerId, dataCategory) => createAction(CONSENT_MANAGER_LIST_OBLIGATIONS[REQUEST], {dataOwnerId: dataOwnerId, dataCategory: dataCategory}),
    success: (response) => createAction(CONSENT_MANAGER_LIST_OBLIGATIONS[SUCCESS], {response}),
    failure: (response) => createAction(CONSENT_MANAGER_LIST_OBLIGATIONS[FAILURE], {response})
}

export const consentManagerCreateDataOwnerPermissionActions = {
    request: (dataOwnerId, attributeId, attributeConstraint, dataCategory) => createAction(
        CONSENT_MANAGER_CREATE_DATA_PERMISSION[REQUEST], {
            dataOwnerId: dataOwnerId,
            attributeId: attributeId,
            attributeConstraint: attributeConstraint,
            dataCategory: dataCategory
        }
    ),
    success: (response) => createAction(CONSENT_MANAGER_CREATE_DATA_PERMISSION[SUCCESS], {response}),
    failure: (response) => createAction(CONSENT_MANAGER_CREATE_DATA_PERMISSION[FAILURE], {response})
}

export const consentManagerCreateDataOwnerObligationActions = {
    request: (dataOwnerId, attributeId, attributeConstraint, dataCategory) => createAction(
        CONSENT_MANAGER_CREATE_DATA_OBLIGATION[REQUEST], {
            dataOwnerId: dataOwnerId,
            attributeId: attributeId,
            attributeConstraint: attributeConstraint,
            dataCategory: dataCategory
        }
    ),
    success: (response) => createAction(CONSENT_MANAGER_CREATE_DATA_OBLIGATION[SUCCESS], {response}),
    failure: (response) => createAction(CONSENT_MANAGER_CREATE_DATA_OBLIGATION[FAILURE], {response})
}