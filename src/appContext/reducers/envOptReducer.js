import { envOption_ActionTypes } from "../actions/envOptionAction"
//import { initialState } from "./initialState";

export const initialState = {
    EnvOptions: []
}

export const envOptionReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case envOption_ActionTypes.LOAD_ENVOPTION:
            return {...state, EnvOptions: payload};
        case envOption_ActionTypes.ADD_ENVOPTION:
            return {...state, EnvOptions: [...state.EnvOptions, payload]};
        case envOption_ActionTypes.UPDATE_ENVOPTION: {
            const updatedList = state.EnvOptions.map(env => env.id == payload.id ? payload : env)
            return {...state, EnvOptions: updatedList};
        }
        default:
            return state;
    }
}