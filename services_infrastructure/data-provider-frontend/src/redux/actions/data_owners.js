import {createAction} from './index';
import {SUCCESS, FAILURE, REQUEST, LIST_DATA_OWNERS, CREATE_DATA_OWNER} from "../types";

export const listDataOwnersActions = {
    request: () => createAction(LIST_DATA_OWNERS[REQUEST], {}),
    success: (response) => createAction(LIST_DATA_OWNERS[SUCCESS], {response}),
    failure: (response) => createAction(LIST_DATA_OWNERS[FAILURE], {response})
};

export const createDataOwnerActions = {
    request: (id) => createAction(CREATE_DATA_OWNER[REQUEST], {id: id}),
    success: (response) => createAction(CREATE_DATA_OWNER[SUCCESS], {response}),
    failure: (response) => createAction(CREATE_DATA_OWNER[FAILURE], {response})
};

