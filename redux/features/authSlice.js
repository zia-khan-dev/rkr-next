import { createSlice } from '@reduxjs/toolkit';
import Router from 'next/router';

const initialState = {
  userId: null,
  user: null,
  isAdmin: null,
  isStaff: null,
  token: null,
  isLoading: false,
  error: null,
  role: null,
  setting: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.userId = action.payload.user.id;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAdmin = action.payload.user.roles.includes('ADMIN');
      state.isStaff = action.payload.user.roles.includes('STAFF');
      state.role = action.payload.user.roles; // Assuming roles is an array
      state.error = null;
      Router.push(`/`); // Redirect after successful login
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logOut: (state) => {
      state.userId = null;
      state.user = null;
      state.token = null;
      state.isAdmin = null;
      state.isStaff = null;
      state.role = null;
      state.setting = null;
      // Optionally redirect to a different page after logout
      Router.push('/sign-in');
    },
    loadUser: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.isAdmin = action.payload.role === 'ADMIN';
      state.isStaff = action.payload.role === 'STAFF';
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
        // state.userId = action.payload.user.id;
        // state.user = action.payload.user;
        // state.token = action.payload.token;
        // state.isAdmin = action.payload.user.roles.includes('ADMIN');
        // state.isStaff = action.payload.user.roles.includes('STAFF');
        // state.role = action.payload.user.roles;
        // state.error = null;
        state.isLoggedIn = true;
        Router.push(`/`); // Redirect after successful sign-up
      },
      signUpFailure: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
    // ... you can add other actions here as needed
  },
});

export const {
  loginSuccess,
  loginFailure,
  logOut,
  loadUser,
  loadSetting,
  setLoading,
  setError,
  signUpFailure,
  signUpSuccess,
  // ... export other actions as needed
} = authSlice.actions;

export default authSlice.reducer;
