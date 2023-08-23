import { createSlice } from '@reduxjs/toolkit';

const SDsSlice = createSlice({
  name: 'SDs',
  initialState: {
    fullSDList: [
      {
        domainSlug: 'Apple-1',
        pageSDList: [],
      },
      {
        domainSlug: 'Google-2',
        pageSDList: [],
      },
      {
        domainSlug: 'Mejuri-3',
        pageSDList: [],
      },
      {
        domainSlug: 'Dollarshaveclub-4',
        pageSDList: [],
      },
      {
        domainSlug: 'Imdb-5',
        pageSDList: [],
      },
    ]
  },
  reducers: {
    addToFullSDList: (state, action) => {
      const { payload } = action;
      state.fullSDList.push(payload);
    },
    addToSpecificSDList: (state, action) => {
      const { payload } = action;
      const domainSlug = payload.domainSlug;
      const newSDObjects = payload.newSDObjects;
      state.fullSDList.find(item => item.domainSlug === domainSlug).pageSDList.push(...newSDObjects);
    }
    // Add more reducers as needed
  },
});
  
  export const { addToFullSDList, addToSpecificSDList } = SDsSlice.actions;
  export default SDsSlice.reducer;