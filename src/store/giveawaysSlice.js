import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getGiveaways, getGiveaway, getWorth } from '../api/gamerpower';

// Async thunks
export const loadGiveaways = createAsyncThunk(
  'giveaways/loadGiveaways',
  async (params = {}) => {
    console.log('🚀 loadGiveaways called with params:', params);
    
    // Convert sortBy to sort-by for API compatibility
    const apiParams = {
      ...params,
      'sort-by': params.sortBy || 'date'
    };
    delete apiParams.sortBy; 
    
    console.log('🔧 Converted to API params:', apiParams);
    
    const response = await getGiveaways(apiParams);
    return response;
  }
);

export const loadDetail = createAsyncThunk(
  'giveaways/loadDetail',
  async (id) => {
    console.log('🚀 loadDetail called with id:', id);
    const response = await getGiveaway(id);
    return response;
  }
);

export const loadWorth = createAsyncThunk(
  'giveaways/loadWorth',
  async (params = {}) => {
    console.log('🚀 loadWorth called with params:', params);
    const response = await getWorth(params);
    return response;
  }
);

const initialState = {
  list: [],
  detail: null,
  worth: null,
  loading: false,
  error: null,
};

const giveawaysSlice = createSlice({
  name: 'giveaways',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearDetail: (state) => {
      state.detail = null;
    },
  },
  extraReducers: (builder) => {
    // Load giveaways
    builder
      .addCase(loadGiveaways.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadGiveaways.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.error = null;
      })
      .addCase(loadGiveaways.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Load detail
    builder
      .addCase(loadDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.detail = action.payload;
        state.error = null;
      })
      .addCase(loadDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Load worth
    builder
      .addCase(loadWorth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadWorth.fulfilled, (state, action) => {
        state.loading = false;
        state.worth = action.payload;
        state.error = null;
      })
      .addCase(loadWorth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearDetail } = giveawaysSlice.actions;
export default giveawaysSlice.reducer;
