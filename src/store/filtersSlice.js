import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  platform: '',
  type: '',
  sortBy: 'date',
  search: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setPlatform: (state, action) => {
      state.platform = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    resetFilters: (state) => {
      state.platform = '';
      state.type = '';
      state.sortBy = 'date';
      state.search = '';
    },
  },
});

export const { setPlatform, setType, setSortBy, setSearch, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
