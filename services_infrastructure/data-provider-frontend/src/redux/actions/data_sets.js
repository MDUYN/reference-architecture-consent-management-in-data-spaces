import {createAction} from './index';
import {SUCCESS, FAILURE, REQUEST, LIST_DATA_SETS, CREATE_DATA_SET} from "../types";

export const listDataSetsActions = {
    request: (data_owner_id) => createAction(LIST_DATA_SETS[REQUEST], {data_owner_id: data_owner_id}),
    success: (response) => createAction(LIST_DATA_SETS[SUCCESS], {response}),
    failure: (response) => createAction(LIST_DATA_SETS[FAILURE], {response})
};

export const createDataSetActions = {
    request: (id, dataCategory, dataOwners) => createAction(CREATE_DATA_SET[REQUEST], {
        id: id, dataCategory: dataCategory, dataOwners: dataOwners
    }),
    success: (response) => createAction(CREATE_DATA_SET[SUCCESS], {response}),
    failure: (response) => createAction(CREATE_DATA_SET[FAILURE], {response})
};

