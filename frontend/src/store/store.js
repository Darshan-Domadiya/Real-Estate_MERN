import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlices/userSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
