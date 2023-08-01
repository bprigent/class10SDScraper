import { createSlice } from '@reduxjs/toolkit';

const domainsSlice = createSlice({
  name: 'domains',
  initialState: {
    domainsList: [
      {name: "Apple", letter: "A"},
      {name: "Google", letter: "G"},
      {name: "Meta", letter: "M"},
      {name: "Amazon", letter: "A"}
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
