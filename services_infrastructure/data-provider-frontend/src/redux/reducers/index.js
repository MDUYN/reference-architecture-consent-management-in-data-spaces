import { combineReducers } from 'redux';
import dataSetReducer from './data_set'
import dataOwnerReducer from "./data_owner";

export default combineReducers({
    dataSets: dataSetReducer,
    dataOwners: dataOwnerReducer
});

export const reduceError = (previousState, action) => {
    let state = {...previousState, error: true}

    if(action.error_message) {
        state.error_message = action.error_message
    }
    return state;
}

export const reduceClearErrors = (previousState) => {
    return {...previousState, error: false, error_message: undefined};
}
