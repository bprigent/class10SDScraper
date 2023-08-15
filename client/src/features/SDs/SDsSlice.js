import { createSlice } from '@reduxjs/toolkit';

const SDsSlice = createSlice({
  name: 'SDs',
  initialState: {
    fullSDList: [
      {
        domainSlug: 'Apple-1',
        pageSDList: [
            {objectOfSD: "value of SD Apple"},
            {objectOfSD: "value of SD Apple 2"},
        ],
      },
      {
        domainSlug: 'Google-2',
        pageSDList: [
            {objectOfSD: "value of SD Google"},
            {objectOfSD: "value of SD Google 2"},
        ],
      },
      {
        domainSlug: 'Bestbuy-3',
        pageSDList: [
            {objectOfSD: "value of SD BestBuy"},
            {objectOfSD: "value of SD BestBuy 2"},
        ],
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