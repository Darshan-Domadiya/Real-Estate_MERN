import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlices/userSlice.js";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  //   version: 1,
};

const rootReducer = combineReducers({ user: userReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
