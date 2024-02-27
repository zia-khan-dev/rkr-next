// src/features/layout/layoutSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchVisibility: false,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    showTopSearchBar: state => {
      state.searchVisibility = true;
    },
    hideTopSearchBar: state => {
      state.searchVisibility = false;
    },
  },
});

export const { showTopSearchBar, hideTopSearchBar } = layoutSlice.actions;

export default layoutSlice.reducer;
