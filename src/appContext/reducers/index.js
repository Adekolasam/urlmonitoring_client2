import { combineReducer } from "redux";
import { environmentReducer } from "./environmentReducer";

const rootReducer = combineReducer({
    environment: environmentReducer
})
