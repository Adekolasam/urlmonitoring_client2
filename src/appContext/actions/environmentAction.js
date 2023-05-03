export const environment_ActionTypes = {
    LOAD_ENVIRONMENT: "LOAD_ENVIRONMENT",
    ADD_ENVIRONMENT: "ADD_ENVIRONMENT",
    UPDATE_ENVIRONMENT: "UPDATE_ENVIRONMENT",
    REMOVE_ENVIRONMENT: "REMOVE_ENVIRONMENT",
}


/* Dispatch actions */
// Environments

export const loadEnvironment = (environment) => ({
    type: environment_ActionTypes.LOAD_ENVIRONMENT,
    payload: environment
});

export const addEnvironment = (environment) => ({
    type: environment_ActionTypes.ADD_ENVIRONMENT,
    payload: environment
});

export const updateEnvironment = (environment) => ({
    type: environment_ActionTypes.UPDATE_ENVIRONMENT,
    payload: environment
});

export const removeEnvironment = (environment) => ({
    type: environment_ActionTypes.REMOVE_ENVIRONMENT,
    payload: environment
});