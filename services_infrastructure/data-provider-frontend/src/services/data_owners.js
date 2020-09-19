import axios from "axios";
import {baseUrl} from "./index";

const createDataOwner = (id) => {
    // Create the post data for the registration endpoint
    let data = {
        'id': id,
    }

    return axios.post(
        `${baseUrl}/data-provider/data-owners`, data
    )
        .then(
            response => {
                return response.data
            }
        );
};

const listDataOwners = () => {
    console.log(`${baseUrl}/data-provider/data-owners`);
    return axios.get(`${baseUrl}/data-provider/data-owners`).then(response => {return response.data});
};

export const dataOwnerCalls = {
    createDataOwner: (id) => createDataOwner(id),
    listDataOwners: () => listDataOwners()
};
