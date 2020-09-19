import {all, fork} from 'redux-saga/effects'
import {createDataOwnerSaga, listDataOwnerSaga} from "./data_owner";
import {createDataSetSaga, listDataSetsSaga} from "./data_sets";

export default function* rootSaga() {

    yield all(
        [
            fork(createDataOwnerSaga),
            fork(listDataOwnerSaga),
            fork(createDataSetSaga),
            fork(listDataSetsSaga)
        ]
    )
};
