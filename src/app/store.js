import { configureStore } from '@reduxjs/toolkit';
import domainsSlice from '../features/domains/domainsSlice';

export default configureStore({
  reducer: {
    domains: domainsSlice,
    // Add more reducers as needed
  },
});