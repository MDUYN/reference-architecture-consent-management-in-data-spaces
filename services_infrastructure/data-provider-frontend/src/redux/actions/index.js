export function createAction(type, payload = {}) {
    return {
        type,
        ...payload,
    };
}

export * from './data_sets';
export * from './data_owners';
