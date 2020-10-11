import { combineReducers } from 'redux';
import dataProviderReducer from "./data_provider";
import consentManagerReducer from "./consent_manager";

export default combineReducers({
    dataProvider: dataProviderReducer,
    consentManager: consentManagerReducer
});

export const reduceError = (previousState, action) => {
    let state = {...previousState, error: true}
    console.log(action);
    if(action.error_message) {
        state.error_message = action.error_message
    }
    return state;
}

export const reduceClearErrors = (previousState) => {
    return {...previousState, error: false, error_message: undefined};
}
