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
            {pageUrl:'https://www.mejuri.com', metaScrapingStatus:'undone', urlScrapingStatus:"undone", title:'', description:''},
            {pageUrl:'https://mejuri.com/ca/en', metaScrapingStatus:'undone', urlScrapingStatus:"undone", title:'', description:''},
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