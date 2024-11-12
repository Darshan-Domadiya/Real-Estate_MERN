import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isError: null,
  currentUser: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.isLoading = true;
    },
    signInSuccess: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.isError = null;
    },
    signInFailure: (state, action) => {
      state.isError = action.payload;
      state.isLoading = false;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;

export default userSlice.reducer;
