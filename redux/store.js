import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authSlice from './features/authSlice';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use localStorage

const rootReducer = combineReducers({
  auth: authSlice,
});

// Configure persist options
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
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
