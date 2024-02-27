import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchApiData = createAsyncThunk(
  'api/fetchData',
  async ({ url, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${url}?_page=${page}&_limit=${limit}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return { data, page, limit };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  data: [],
  loading: false,
  error: null,
  page: 1,
  limit: 10,
  totalPages: 1, // Assuming you can calculate or retrieve this from the response
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    resetPagination: (state) => {
      state.page = 1;
    },
    // Add other reducers as needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchApiData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        // Update totalPages based on the response if possible
      })
      .addCase(fetchApiData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPagination } = apiSlice.actions;

export default apiSlice.reducer;
