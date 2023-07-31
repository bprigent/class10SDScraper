import { configureStore } from '@reduxjs/toolkit';
import domainsReducer from '../features/domains/domainsSlice';

export const store = configureStore({
  reducer: {
    domains: domainsReducer,
  },
});