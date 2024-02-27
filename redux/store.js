import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authSlice from './features/authSlice';
import layoutSlice from './features/layoutSlice';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use localStorage
import apiSlice from './features/apiSlice';
import searchSlice from './features/searchSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  layout: layoutSlice,
  api: apiSlice,
  search: searchSlice,

});

// Configure persist options
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'layout'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check temporarily
    }),


});

// Create a persistor object for later use (optional)
export const persistor = persistStore(store);
