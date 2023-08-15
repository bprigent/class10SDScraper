import { createSlice } from '@reduxjs/toolkit';

const domainsSlice = createSlice({
  name: 'domains',
  initialState: {
    domainsList: [
      {id:1, name: "Apple", letter: "A", url: "https://www.apple.com", slug:"Apple-1", maxUrlList:100},
      {id:2, name: "Google", letter: "G", url: "https://www.google.com", slug:"Google-2", maxUrlList:100},
      {id:3, name: "Bestbuy", letter: "B", url: "https://www.bestbuy.ca", slug:"Bestbuy-3", maxUrlList:100},
    ]
  },
  reducers: {
    addToDomainsList: (state, action) => {
      const { payload } = action;
      state.domainsList.push(payload);
    },
    updateMaxUrlList: (state, action) => {
      const { payload } = action;
      const slug = payload.slug;
      const newMaxUrlList = payload.newMaxUrlList;
      state.domainsList.find(item => item.slug === slug).maxUrlList = newMaxUrlList;
    },
    // Add more reducers as needed
  },
});

export const { addToDomainsList, updateMaxUrlList } = domainsSlice.actions;
export default domainsSlice.reducer;
