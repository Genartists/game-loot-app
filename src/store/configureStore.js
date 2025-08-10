import { configureStore } from '@reduxjs/toolkit';
import giveawaysReducer from './giveawaysSlice';
import filtersReducer from './filtersSlice';
import savedReducer from './savedSlice';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    giveaways: giveawaysReducer,
    filters: filtersReducer,
    saved: savedReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;
