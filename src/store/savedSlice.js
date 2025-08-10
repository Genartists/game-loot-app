import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const savedSlice = createSlice({
  name: 'saved',
  initialState,
  reducers: {
    save: (state, action) => {
      const existingIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingIndex === -1) {
        state.items.push(action.payload);
      }
    },
    remove: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearSaved: (state) => {
      state.items = [];
    },
  },
});

export const { save, remove, clearSaved } = savedSlice.actions;
export default savedSlice.reducer;
