import { configureStore } from '@reduxjs/toolkit';

//importing reducers
import domainsReducer from '../features/showDomains/domainsSlice';
import urlsReducer from '../features/URLs/urlsSlice';
import titleReducer from '../features/titleAndDescription/titleSlice';
import descriptionReducer from '../features/titleAndDescription/descriptionSlice';
import scrapedUrlsReducer from '../features/scrapeUrlsFromPage/scrapeUrlsFromPageSlice';
import scrapedSDsReducer from '../features/scrapeSDsFromPage/scrapeSDsFromPageSlice';
import SDsReducer from '../features/SDs/SDsSlice'

export const store = configureStore({
  reducer: {
    //basic slices
    domains: domainsReducer,
    urls: urlsReducer,
    SDs: SDsReducer,
    // meta data slices
    title: titleReducer,
    description: descriptionReducer,
    // data coming back from server slices
    scrapedUrls: scrapedUrlsReducer,
    scrapedSDs: scrapedSDsReducer,
  },
});