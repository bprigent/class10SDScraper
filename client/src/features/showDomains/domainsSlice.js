import { createSlice } from '@reduxjs/toolkit';

const domainsSlice = createSlice({
  name: 'domains',
  initialState: {
    domainsList: [
      {id:1, name: "Apple", letter: "A", url: "https://www.apple.com", slug:"Apple-1"},
      {id:2, name: "Google", letter: "G", url: "https://www.google.com", slug:"Google-2"},
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
