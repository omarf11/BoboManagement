import { combineReducers, configureStore } from "@reduxjs/toolkit";

import projectReducer from "./modules/projectModule";
import { thunk } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "./modules/authModule";

// Combine reducers (add more slices as needed)
const rootReducer = combineReducers({
  project: projectReducer,
  userAuth: authReducer
});

const middleware = [thunk];

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(middleware),
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export const useAppDispatch = ():AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export default store;
