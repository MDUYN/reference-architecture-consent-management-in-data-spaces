import axios from "axios";
import {baseUrl} from "./index";

const createDataSet = (id, dataCategory, dataOwners) => {
    // Create the post data for the registration endpoint
    let data = {
        'id': id,
        'data_category': dataCategory,
        'data_owners': dataOwners
    }

    return axios.post(
        `${baseUrl}/data-provider/data-sets`, data
    )
    .then(
        response => {
            console.log(response.data);
            return response.data
        }
    );
};

const listDataSets = () => {
    return axios.get(`${baseUrl}/data-provider/data-sets`).then(response => {return response.data});
};

export const dataSetCalls = {
    createDataSet: (id, dataCategory, dataOwners) => createDataSet(id, dataCategory, dataOwners),
    listDataSets: () => listDataSets()
};
