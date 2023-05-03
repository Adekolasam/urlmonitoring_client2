import { envOptions_ActionTypes } from "./actionTypes";



// Environment Options
export const addEnvOptions = (envOption) => ({
    type: envOptions_ActionTypes.ADD_ENVIRONMENT,
    payload: envOption
});

export const updateEnvOptions = (envOption) => ({
    type: envOptions_ActionTypes.UPDATE_ENVIRONMENT,
    payload: envOption
});

export const removeEnvOptions = (envOption) => ({
    type: envOptions_ActionTypes.REMOVE_ENVIRONMENT,
    payload: envOption
});