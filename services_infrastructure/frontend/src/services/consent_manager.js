import axios from "axios";
import {baseUrl} from "./index";

const createDataOwner = (id) => {
    // Create the post data for the registration endpoint
    let data = {
        'id': id,
    }

    return axios.post(
        `${baseUrl}/api/consent-manager/data-owners`, data
    )
        .then(
            response => {
                return response.data
            }
        );
};

const listDataOwners = () => {
    return axios.get(`${baseUrl}/api/consent-manager/data-owners`).then(response => {
        return response.data
    });
};


const createDataProvider = (id) => {
    // Create the post data for the registration endpoint
    let data = {
        'id': id,
    }

    return axios.post(
        `${baseUrl}/api/consent-manager/data-providers`, data
    )
        .then(
            response => {
                return response.data
            }
        );
};

const listDataProviders = () => {
    return axios.get(`${baseUrl}/api/consent-manager/data-providers`).then(response => {return response.data});
};

const createDataSet = (dataProviderId, dataSetId, dataCategory, dataOwners) => {
    // Create the post data for the registration endpoint
    let data = {
        'id': dataSetId,
        'data_category': dataCategory,
        'data_owners': dataOwners
    }

    return axios.post(
        `${baseUrl}/api/consent-manager/${dataProviderId}/data-sets`, data
    )
    .then(
        response => {
            return response.data
        }
    );
};


const listDataSets = (dataProviderId) => {
    return axios.get(`${baseUrl}/api/consent-manager/${dataProviderId}/data-sets`).then(response => {return response.data});
};

const listDataOwnerDataSets = (dataOwnerId) => {
    return axios.get(`${baseUrl}/api/consent-manager/data-owners/${dataOwnerId}/data-sets`).then(response => {return response.data});
};

const listDataOwnerPermissions = (dataOwnerId, dataCategory) => {
    return axios.get(`${baseUrl}/api/consent-manager/data-owners/${dataOwnerId}/data-permissions/${dataCategory}`).then(response => {return response.data});
};

const listDataOwnerObligations = (dataOwnerId, dataCategory) => {
    return axios.get(`${baseUrl}/api/consent-manager/data-owners/${dataOwnerId}/data-obligations/${dataCategory}`).then(response => {return response.data});
};

const createDataOwnerObligation = (dataOwnerId, ruleId, attributeValue, dataCategory) => {
    let data = {
        'attribute_id': ruleId,
        'attribute_constraint': attributeValue,
        'data_category': dataCategory
    }

    return axios.post(`${baseUrl}/api/consent-manager/data-owners/${dataOwnerId}/data-obligations`, data)
        .then(
            response => {
                return response.data
            }
    );
}

const createDataOwnerPermission = (dataOwnerId, attributeId, attributeConstraint, dataCategory) => {
    let data = {
        'attribute_id': attributeId,
        'attribute_constraint': attributeConstraint,
        'data_category': dataCategory
    }

    return axios.post(`${baseUrl}/api/consent-manager/data-owners/${dataOwnerId}/data-permissions`, data)
        .then(
            response => {
                return response.data
            }
        );
}

export const consentManagerCalls = {
    createDataOwner: (id) => createDataOwner(id),
    listDataOwners: () => listDataOwners(),
    listDataOwnerDataSets: (dataOwnerId) => listDataOwnerDataSets(dataOwnerId),
    createDataProvider: (id) => createDataProvider(id),
    listDataProviders: () => listDataProviders(),
    createDataSet: (dataProviderId, dataSetId, dataCategory, dataOwners) => createDataSet(dataProviderId, dataSetId, dataCategory, dataOwners),
    listDataSet: (dataProviderId) => listDataSets(dataProviderId),
    listDataOwnerPermissions: (dataOwnerId, dataCategory) => listDataOwnerPermissions(dataOwnerId, dataCategory),
    listDataOwnerObligations: (dataOwnerId, dataCategory) => listDataOwnerObligations(dataOwnerId, dataCategory),
    createDataOwnerObligation: (dataOwnerId, attributeId, attributeConstraint, dataCategory) => createDataOwnerObligation(dataOwnerId, attributeId, attributeConstraint, dataCategory),
    createDataOwnerPermission: (dataOwnerId, attributeId, attributeConstraint, dataCategory) => createDataOwnerPermission(dataOwnerId, attributeId, attributeConstraint, dataCategory),
};
