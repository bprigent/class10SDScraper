import { configureStore } from '@reduxjs/toolkit';

//importing reducers
import domainsReducer from '../features/showDomains/domainsSlice';
import urlsReducer from '../features/URLs/urlsSlice';
import titleReducer from '../features/titleAndDescription/titleSlice';
import descriptionReducer from '../features/titleAndDescription/descriptionSlice';
import scrapedUrlsReducer from '../features/scrapeUrlsFromPage/scrapeUrlsFromPageSlice';

export const store = configureStore({
  reducer: {
    domains: domainsReducer,
    urls: urlsReducer,
    title: titleReducer,
    description: descriptionReducer,
    scrapedUrls: scrapedUrlsReducer,
  },
});