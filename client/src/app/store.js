import { configureStore } from '@reduxjs/toolkit';
import domainsReducer from '../features/showDomains/domainsSlice';

export const store = configureStore({
  reducer: {
    domains: domainsReducer,
  },
});