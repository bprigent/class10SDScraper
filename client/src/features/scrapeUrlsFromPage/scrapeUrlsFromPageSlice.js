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
      data: null,
      status: 'idle',
      error: null
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(scrapeUrlsFromPage.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(scrapeUrlsFromPage.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.data = action.payload.newUrls;
        })
        .addCase(scrapeUrlsFromPage.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        });
    }
  });
  
  export default scrapedUrlsSlice.reducer;