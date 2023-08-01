import { createSlice } from '@reduxjs/toolkit';

const domainsSlice = createSlice({
  name: 'domains',
  initialState: {
    domainsList: [
      {name: "Apple", letter: "A", url: "https://www.apple.com"},
      {name: "Google", letter: "G", url: "https://www.google.com"},
      {name: "Meta", letter: "M", url: "https://www.meta.com"},
      {name: "Amazon", letter: "A", url: "https://www.amazon.com"},
      {name: "Shopify", letter: "S", url: "https://www.shopify.com"}
    ]
  },
  reducers: {
    addToDomainsList: (state, action) => {
      const { payload } = action;
      state.domainsList = [...state.domainsList, payload];
    },
    // Add more reducers as needed
  },
});

export const { addToDomainsList } = domainsSlice.actions;
export default domainsSlice.reducer;
