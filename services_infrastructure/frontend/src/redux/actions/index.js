export function createAction(type, payload = {}) {
    return {
        type,
        ...payload,
    };
}

export * from './consent_manager';
export * from './data_provider';