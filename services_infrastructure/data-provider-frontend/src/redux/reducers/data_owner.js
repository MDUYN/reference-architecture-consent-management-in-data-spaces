import {REQUEST, FAILURE, SUCCESS, LIST_DATA_OWNERS, CREATE_DATA_OWNER, CLEAR_DATA_OWNER_ERRORS} from "../types";
import {reduceError, reduceClearErrors} from "./index";

const initialState = {
    items: [],
    dataOwnerCreated: false,
    error: false
};

export default function dataOwnerReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_DATA_OWNER[REQUEST]:
            return {...state, error: false, dataOwnerCreated: false};
        case LIST_DATA_OWNERS[REQUEST]:
            return {...state, items: [], dataOwnerCreated: false, error: false};
        case LIST_DATA_OWNERS[FAILURE]:
            return reduceError(state, action);
        case CREATE_DATA_OWNER[FAILURE]:
            return reduceError(state, action);
        case LIST_DATA_OWNERS[SUCCESS]:
            return {items: action.response, error: false};
        case CREATE_DATA_OWNER[SUCCESS]:
            return {...state, dataOwnerCreated: true, error: false};
        case CLEAR_DATA_OWNER_ERRORS:
            return reduceClearErrors(state);
        default:
            return state;
    }
};
