import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// front end side of the fetchTitle
export const scrapeUrlsFromPage = createAsyncThunk(
    'scrapeUrlsFromPage/fetch',
    async (url, thunkAPI) => {
      try {
        const response = await fetch('http://localhost:3001/scrape-urls-from-page', {
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
const scrapedUrlsSlice = createSlice({
    name: 'scrapedUrls',
    initialState: {
      scrapedUrlsData: null,
      scrapedUrlsStatus: 'idle',
      scrapedUrlsError: null
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(scrapeUrlsFromPage.pending, (state) => {
          state.scrapedUrlsStatus = 'loading';
        })
        .addCase(scrapeUrlsFromPage.fulfilled, (state, action) => {
          state.scrapedUrlsStatus = 'succeeded';
          state.scrapedUrlsData = action.payload.newUrls;
        })
        .addCase(scrapeUrlsFromPage.rejected, (state, action) => {
          state.scrapedUrlsStatus = 'failed';
          state.scrapedUrlsError = action.payload;
        });
    }
  });
  
  export default scrapedUrlsSlice.reducer;