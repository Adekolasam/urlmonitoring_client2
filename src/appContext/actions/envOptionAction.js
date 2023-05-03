export const envOption_ActionTypes = {
    LOAD_ENVOPTION: "LOAD_ENVOPTION",
    ADD_ENVOPTION: "ADD_ENVOPTION",
    UPDATE_ENVOPTION: "UPDATE_ENVOPTION",
    REMOVE_ENVOPTION: "REMOVE_ENVOPTION",
}


/* Dispatch actions */
// envOptions

export const loadEnvOption = (envOption) => ({
    type: envOption_ActionTypes.LOAD_ENVOPTION,
    payload: envOption
});

export const addEnvOption = (envOption) => ({
    type: envOption_ActionTypes.ADD_ENVOPTION,
    payload: envOption
});

export const updateEnvOption = (envOption) => ({
    type: envOption_ActionTypes.UPDATE_ENVOPTION,
    payload: envOption
});

export const removeEnvOption = (envOption) => ({
    type: envOption_ActionTypes.REMOVE_ENVOPTION,
    payload: envOption
});