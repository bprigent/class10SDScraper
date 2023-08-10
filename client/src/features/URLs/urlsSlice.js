import { createSlice } from '@reduxjs/toolkit';

const urlsSlice = createSlice({
  name: 'urls',
  initialState: {
    fullUrlList: [
      {
        domainSlug: 'Apple-1',
        pageUrlList: [
            {pageUrl:'https://www.apple.com/', metaScraped:false, urlScraped:false, title:'', description:''},
            {pageUrl:'https://www.apple.com/store', metaScraped:false, urlScraped:false, title:'', description:''},
            {pageUrl:'https://www.apple.com/mac', metaScraped:false, urlScraped:false, title:'', description:''},
        ],
      },
      {
        domainSlug: 'Google-2',
        pageUrlList: [
            {pageUrl:'https://www.google.com/', metaScraped:false, urlScraped:false, title:'', description:''},
            {pageUrl:'https://store.google.com/', metaScraped:false, urlScraped:false, title:'', description:''},
            {pageUrl:'https://store.google.com/ca/category/earbuds/yellowgear/greenpoddle/yes', metaScraped:false, urlScraped:false, title:'', description:''},
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
    setUrlScrapedToTrue: (state, action) => {
      const { payload } = action;
      const slugPath = payload.slugPath;
      const url = payload.url;
      state.fullUrlList.find(item => item.domainSlug === slugPath).pageUrlList.find(item => item.pageUrl === url).urlScraped = true;
    }
    // Add more reducers as needed
  },
});
  
  export const { addToFullUrlList, addToSpecificUrlList, setUrlScrapedToTrue } = urlsSlice.actions;
  export default urlsSlice.reducer;