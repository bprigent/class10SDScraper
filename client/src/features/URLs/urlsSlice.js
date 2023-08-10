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
    // Add more reducers as needed
  },
});
  
  export const { addToFullUrlList } = urlsSlice.actions;
  export default urlsSlice.reducer;