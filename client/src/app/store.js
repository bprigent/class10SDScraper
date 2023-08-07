import { configureStore } from '@reduxjs/toolkit';
import domainsReducer from '../features/showDomains/domainsSlice';
import urlsReducer from '../features/URLs/urlsSlice';
import titleReducer from '../features/titleAndDescription/titleAndDescriptionSlice'

export const store = configureStore({
  reducer: {
    domains: domainsReducer,
    urls: urlsReducer,
    title: titleReducer,
  },
});