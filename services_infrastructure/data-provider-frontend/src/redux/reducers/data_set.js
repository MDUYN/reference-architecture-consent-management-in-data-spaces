import {REQUEST, FAILURE, SUCCESS, LIST_DATA_SETS, CREATE_DATA_SET} from "../types";
import {reduceError} from "./index";

const initialState = {
    items: [],
    dataSetCreated: false,
    error: false
};

export default function dataSetReducer(state = initialState, action) {
    switch (action.type) {
        case LIST_DATA_SETS[REQUEST]:
            return {...state, error: false, dataSetCreated: false, data_sets: undefined};
        case CREATE_DATA_SET[REQUEST]:
            return {...state, items: [], dataSetCreated: false, error: false};
        case LIST_DATA_SETS[FAILURE]:
            return reduceError(state, action);
        case CREATE_DATA_SET[FAILURE]:
            return reduceError(state, action);
        case CREATE_DATA_SET[SUCCESS]:
            return {...state, items: action.response, error: false, dataSetCreated: true};
        case LIST_DATA_SETS[SUCCESS]:
            return {...state, items: action.response, error: false, dataSetCreated: false};
        default:
            return state;
    }
};