import { environment_ActionTypes } from "../actions/environmentAction"
//import { initialState } from "./initialState";

export const initialState = {
    Environments: []
}

export const environmentReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case environment_ActionTypes.LOAD_ENVIRONMENT:
            return {...state, Environments: payload};
        case environment_ActionTypes.ADD_ENVIRONMENT:
            return {...state, Environments: [...state.Environments, payload]};
        case environment_ActionTypes.UPDATE_ENVIRONMENT: {
            const updatedList = state.Environments.map(env => env.id == payload.id ? {...env, name: payload.name} : env)
            return {...state, Environments: updatedList};
        }
        default:
            return state;
    }
}