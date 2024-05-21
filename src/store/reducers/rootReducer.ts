import { combineReducers, configureStore } from "@reduxjs/toolkit";

import projectReducer from "./projectReducer";
import { thunk } from "redux-thunk";

// Combine reducers (add more slices as needed)
const rootReducer = combineReducers({
  // auth:authReducer,
  project: projectReducer,
});

const middleware = [thunk];

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(middleware),
});

export default store;
