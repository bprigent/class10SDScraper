import { createSlice } from '@reduxjs/toolkit';

const domainsSlice = createSlice({
  name: 'domains',
  initialState: {
    domainsList: ["Apple", "Google", "Meta", "Amazon"]
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
