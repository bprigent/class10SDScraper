import { createSlice } from '@reduxjs/toolkit';

const domainsSlice = createSlice({
  name: 'domains',
  initialState: {
    domainsList: [
      {id:1, name: "Apple", letter: "A", url: "https://www.apple.com", slug:"Apple-1"},
      {id:2, name: "Google", letter: "G", url: "https://www.google.com", slug:"Google-2"},
      {id:3, name: "Meta", letter: "M", url: "https://www.meta.com", slug:"Meta-3"},
      {id:4, name: "Amazon", letter: "A", url: "https://www.amazon.com", slug:"Amazon-4"},
      {id:5, name: "Shopify", letter: "S", url: "https://www.shopify.com", slug:"Shopify-5"}
    ]
  },
  reducers: {
    addToDomainsList: (state, action) => {
      const { payload } = action;
      state.domainsList.push(payload);
    },
    // Add more reducers as needed
  },
});

export const { addToDomainsList } = domainsSlice.actions;
export default domainsSlice.reducer;
