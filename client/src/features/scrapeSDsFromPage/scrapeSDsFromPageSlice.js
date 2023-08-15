import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// front end side of the scrapeSDsFromPage
export const scrapeSDsFromPage = createAsyncThunk(
    'scrapeSDsFromPage/fetch',
    async (url, thunkAPI) => {
      try {
        const response = await fetch('http://localhost:3001/scrape-sds-from-page', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ url })
        });
        
        const data = await response.json();
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.toString());
      }
    }
  );





// title slice that goes with the async think bove
const scrapedSDsSlice = createSlice({
  name: 'scrapedSDs',
  initialState: {
    scrapedSDsData: null,
    scrapedSDsStatus: 'idle',
    scrapedSDsError: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(scrapeSDsFromPage.pending, (state) => {
        state.scrapedSDsStatus = 'loading';
      })
      .addCase(scrapeSDsFromPage.fulfilled, (state, action) => {
        state.scrapedSDsStatus = 'succeeded';
        state.scrapedSDsData = action.payload.newSDs;
      })
      .addCase(scrapeSDsFromPage.rejected, (state, action) => {
        state.scrapedSDsStatus = 'failed';
        state.scrapedSDsError = action.payload;
      });
  }
});

export default scrapedSDsSlice.reducer;