export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

// Function to create Request types for an action
export function createRequestTypes(base) {
    if (!base) {
        throw new Error('cannot create request type with base = \'\' or base = null');
    }

    return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
        acc[type] = `${base}_${type}`;
        return acc;
    }, {});
}

// Clear error types
export const CLEAR_DATA_SET_ERRORS = 'CLEAR_DATA_SET_ERRORS';
export const CLEAR_DATA_OWNER_ERRORS = 'CLEAR_DATA_OWNER_ERRORS';

// Types related to data owners
export const LIST_DATA_OWNERS = createRequestTypes('LIST_DATA_OWNERS');
export const CREATE_DATA_OWNER = createRequestTypes('CREATE_DATA_OWNER');

// Types related to retrieval of a data set
export const LIST_DATA_SETS = createRequestTypes('LIST_DATA_SETS');
export const RETRIEVE_DATA_SET = createRequestTypes('RETRIEVE_DATA_SET');
export const CREATE_DATA_SET = createRequestTypes('CREATE_DATA_SET');


