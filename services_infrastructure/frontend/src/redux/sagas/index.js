import {all, fork} from 'redux-saga/effects'
import {
    consentManagerListDataSetsSaga,
    consentManagerListDataProvidersSaga,
    consentManagerCreateDataProviderSaga,
    consentManagerCreateDataOwnerSaga,
    consentManagerCreateDataSetSaga,
    consentManagerListDataOwnerDataSets,
    consentManagerListDataOwnersSaga,
    consentManagerListDataOwnerObligations,
    consentManagerListDataOwnerPermissions,
    consentManagerCreateObligation,
    consentManagerCreatePermission
} from "./consentManager";
import {
    dataProviderCreateDataOwnerSaga,
    dataProviderCreateDataSetSaga,
    dataProviderListDataOwnerSaga,
    dataProviderListDataSetsSaga
} from "./dataProvider";

export default function* rootSaga() {

    yield all(
        [
            fork(dataProviderCreateDataOwnerSaga),
            fork(dataProviderCreateDataSetSaga),
            fork(dataProviderListDataOwnerSaga),
            fork(dataProviderListDataSetsSaga),
            fork(consentManagerListDataSetsSaga),
            fork(consentManagerListDataProvidersSaga),
            fork(consentManagerCreateDataProviderSaga),
            fork(consentManagerCreateDataOwnerSaga),
            fork(consentManagerCreateDataSetSaga),
            fork(consentManagerListDataOwnerDataSets),
            fork(consentManagerListDataOwnersSaga),
            fork(consentManagerListDataOwnerObligations),
            fork(consentManagerListDataOwnerPermissions),
            fork(consentManagerCreateObligation),
            fork(consentManagerCreatePermission)
        ]
    )
};
