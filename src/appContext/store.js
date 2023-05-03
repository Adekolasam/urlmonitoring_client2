import { configureStore } from '@reduxjs/toolkit'
import { environmentReducer } from "./reducers/environmentReducer";
import {envOptionReducer} from "./reducers/envOptReducer"

export default configureStore({
  reducer: {
    environmentReducer,
    envOptionReducer
  }
})

