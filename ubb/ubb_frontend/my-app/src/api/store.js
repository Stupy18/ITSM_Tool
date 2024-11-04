// store.js
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './ApiSlice.ts'; // Import your API slice

const store = configureStore({
  reducer: {
    // Add the apiSlice reducer to the store under a specific key
    [apiSlice.reducerPath]: apiSlice.reducer,
    // Add other reducers here if you have them
  },
  // Adding the apiSlice middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
