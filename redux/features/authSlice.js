import { createSlice } from "@reduxjs/toolkit";
import Router from "next/router";

const initialState = {
  userId: null,
  user: null,
  token: null,
  isLoading: false,
  error: null,
  role: null,
  setting: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      // state.userId = action.payload.user.id;
      // state.user = action.payload.user;
      // state.token = action.payload.token;
      // state.role = action.payload.user.roles; // Assuming roles is an array
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    signOut: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      state.role = null;
      state.setting = null;
    },
    loadUser: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.role = action.payload.role;
    },
    loadSetting: (state, action) => {
      state.setting = action.payload.setting;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    signUpSuccess: (state, action) => {
      state.isLoading = false;
      state.userId = action.payload.userId;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.error = null;
      state.isLoggedIn = true;
    },
    signUpFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // ... you can add other actions here as needed
  },
});

export const {
  signInSuccess,
  signInFailure,
  signOut,
  loadUser,
  loadSetting,
  setLoading,
  setError,
  signUpFailure,
  signUpSuccess,
  // ... export other actions as needed
} = authSlice.actions;

export default authSlice.reducer;
