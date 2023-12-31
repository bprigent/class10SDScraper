import { createSlice } from '@reduxjs/toolkit';

const urlsSlice = createSlice({
  name: 'urls',
  initialState: {
    fullUrlList: [
      {
        domainSlug: 'Apple-1',
        pageUrlList: [
            {pageUrl:'https://www.apple.com/', metaScrapingStatus:'undone', urlScrapingStatus:'undone', title:'', description:''},
        ],
      },
      {
        domainSlug: 'Google-2',
        pageUrlList: [
            {pageUrl:'https://www.google.com/', metaScrapingStatus:'undone', urlScrapingStatus:"undone", title:'', description:''},
        ],
      },
      {
        domainSlug: 'Mejuri-3',
        pageUrlList: [
            {pageUrl:'https://mejuri.com/ca/en', metaScrapingStatus:'undone', urlScrapingStatus:"undone", title:'', description:''},
        ],
      },
      {
        domainSlug: 'Dollarshaveclub-4',
        pageUrlList: [
            {pageUrl:'https://ca.dollarshaveclub.com/', metaScrapingStatus:'undone', urlScrapingStatus:"undone", title:'', description:''},
        ],
      },
      {
        domainSlug: 'Imdb-5',
        pageUrlList: [
            {pageUrl:'https://www.imdb.com/', metaScrapingStatus:'undone', urlScrapingStatus:"undone", title:'', description:''},
        ],
      },
      {
        domainSlug: 'TheEconomist-6',
        pageUrlList: [
            {pageUrl:'https://www.economist.com/', metaScrapingStatus:'undone', urlScrapingStatus:"undone", title:'', description:''},
        ],
      },
    ]
  },
  reducers: {
    addToFullUrlList: (state, action) => {
      const { payload } = action;
      state.fullUrlList.push(payload);
    },
    addToSpecificUrlList: (state, action) => {
      const { payload } = action;
      const domainSlug = payload.domainSlug;
      const newUrlObjects = payload.newUrlObjects;
      state.fullUrlList.find(item => item.domainSlug === domainSlug).pageUrlList.push(...newUrlObjects);
    },
    setUrlScrapingStatusToDone: (state, action) => {
      const { payload } = action;
      const slugPath = payload.slugPath;
      const url = payload.url;
      state.fullUrlList.find(item => item.domainSlug === slugPath).pageUrlList.find(item => item.pageUrl === url).urlScrapingStatus = 'done';
    },
    setUrlScrapingStatusToInProgress: (state, action) => {
      const { payload } = action;
      const slugPath = payload.slugPath;
      const url = payload.url;
      state.fullUrlList.find(item => item.domainSlug === slugPath).pageUrlList.find(item => item.pageUrl === url).urlScrapingStatus = 'inProgress';
    }
    // Add more reducers as needed
  },
});
  
  export const { addToFullUrlList, addToSpecificUrlList, setUrlScrapingStatusToDone, setUrlScrapingStatusToInProgress } = urlsSlice.actions;
  export default urlsSlice.reducer;