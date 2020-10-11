import {createAction} from './index';
import {
    SUCCESS,
    FAILURE,
    REQUEST,
    DATA_PROVIDER_LIST_DATA_OWNERS,
    DATA_PROVIDER_CREATE_DATA_OWNER,
    DATA_PROVIDER_LIST_DATA_SETS,
    DATA_PROVIDER_CREATE_DATA_SET
} from "../types";

export const dataProviderListDataOwnersActions = {
    request: () => createAction(DATA_PROVIDER_LIST_DATA_OWNERS[REQUEST], {}),
    success: (response) => createAction(DATA_PROVIDER_LIST_DATA_OWNERS[SUCCESS], {response}),
    failure: (response) => createAction(DATA_PROVIDER_LIST_DATA_OWNERS[FAILURE], response)
};

export const dataProviderCreateDataOwnerActions = {
    request: (id) => createAction(DATA_PROVIDER_CREATE_DATA_OWNER[REQUEST], {id: id}),
    success: (response) => createAction(DATA_PROVIDER_CREATE_DATA_OWNER[SUCCESS], {response}),
    failure: (response) => createAction(DATA_PROVIDER_CREATE_DATA_OWNER[FAILURE], {response})
};

export const dataProviderListDataSetsActions = {
    request: (data_owner_id) => createAction(DATA_PROVIDER_LIST_DATA_SETS[REQUEST], {data_owner_id: data_owner_id}),
    success: (response) => createAction(DATA_PROVIDER_LIST_DATA_SETS[SUCCESS], {response}),
    failure: (response) => createAction(DATA_PROVIDER_LIST_DATA_SETS[FAILURE], {response})
};

export const dataProviderCreateDataSetActions = {
    request: (id, dataCategory, dataOwners) => createAction(DATA_PROVIDER_CREATE_DATA_SET[REQUEST], {
        id: id, dataCategory: dataCategory, dataOwners: dataOwners
    }),
    success: (response) => createAction(DATA_PROVIDER_CREATE_DATA_SET[SUCCESS], {response}),
    failure: (response) => createAction(DATA_PROVIDER_CREATE_DATA_SET[FAILURE], {response})
};

