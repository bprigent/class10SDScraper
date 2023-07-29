import { createSlice } from '@reduxjs/toolkit';

const domainsSlice = createSlice({
  name: 'domains',
  initialState: {
    name:"hello"
  },
  reducers: {
    myAction: (state, action) => {
      // Fill in the logic for this reducer here
    },
    // Add more reducers as needed
  },
});

export const { myAction } = domainsSlice.actions;

export default domainsSlice.reducer;
