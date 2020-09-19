import {createStore, compose, applyMiddleware} from 'redux';
import {createWrapper, HYDRATE} from 'next-redux-wrapper';
import combinedReducer from './reducers/index';
import createSagaMiddleware from 'redux-saga';

import rootSaga from "./sagas";

const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        console.log('hydrate');
        console.log(state.user.error);
        console.log(action.payload.user.error);
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        }
        // if (state.count) nextState.count = state.count // preserve count value on client side navigation
        console.log(nextState);
        return nextState
    } else {
        return combinedReducer(state, action)
    }
}

// function configureStore()
// create a makeStore function
const makeStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const composeEnhancers = typeof window != 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    let store = createStore(reducer, {}, composeEnhancers(
        applyMiddleware(sagaMiddleware)
        )
    );
    sagaMiddleware.run(rootSaga);

    return store
}

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, {debug: true});
