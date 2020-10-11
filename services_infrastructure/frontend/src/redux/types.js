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
export const DATA_PROVIDER_CLEAR_DATA_SET_ERRORS = 'CLEAR_DATA_SET_ERRORS';
export const DATA_PROVIDER_CLEAR_DATA_OWNER_ERRORS = 'CLEAR_DATA_OWNER_ERRORS';

// Data provider types
export const DATA_PROVIDER_LIST_DATA_OWNERS = createRequestTypes('LIST_DATA_OWNERS');
export const DATA_PROVIDER_CREATE_DATA_OWNER = createRequestTypes('CREATE_DATA_OWNER');

export const DATA_PROVIDER_LIST_DATA_SETS = createRequestTypes('LIST_DATA_SETS');
export const DATA_PROVIDER_RETRIEVE_DATA_SET = createRequestTypes('RETRIEVE_DATA_SET');
export const DATA_PROVIDER_CREATE_DATA_SET = createRequestTypes('CREATE_DATA_SET');

// Consent manager types
export const CONSENT_MANAGER_LIST_DATA_OWNERS = createRequestTypes('CONSENT_MANAGER_LIST_DATA_OWNERS');
export const CONSENT_MANAGER_CREATE_DATA_OWNER = createRequestTypes('CONSENT_MANAGER_CREATE_DATA_OWNER');

export const CONSENT_MANAGER_LIST_DATA_PROVIDERS = createRequestTypes('CONSENT_MANAGER_LIST_DATA_PROVIDERS');
export const CONSENT_MANAGER_CREATE_DATA_PROVIDER = createRequestTypes('CONSENT_MANAGER_CREATE_DATA_PROVIDER');


export const CONSENT_MANAGER_LIST_DATA_SETS = createRequestTypes('CONSENT_MANAGER_LIST_DATA_SETS');
export const CONSENT_MANAGER_CREATE_DATA_SET = createRequestTypes('CONSENT_MANAGER_CREATE_DATA_SET');

export const CONSENT_MANAGER_LIST_DATA_OWNER_DATA_SETS = createRequestTypes('CONSENT_MANAGER_DATA_OWNER_DATA_SETS');

export const CONSENT_MANAGER_LIST_PERMISSIONS = createRequestTypes('CONSENT_MANAGER_LIST_DATA_OWNER_PERMISSIONS');
export const CONSENT_MANAGER_LIST_OBLIGATIONS = createRequestTypes('CONSENT_MANAGER_LIST_DATA_OWNER_OBLIGATIONS');

export const CONSENT_MANAGER_CREATE_DATA_PERMISSION = createRequestTypes('CONSENT_MANAGER_CREATE_DATA_PERMISSION');
export const CONSENT_MANAGER_CREATE_DATA_OBLIGATION = createRequestTypes('CONSENT_MANAGER_CREATE_DATA_OBLIGATION');