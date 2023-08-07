import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// front end side of the fetchTitle
export const fetchTitle = createAsyncThunk(
    'title/fetch',
    async (url, thunkAPI) => {
      try {
        const response = await fetch('http://localhost:3001/fetch-title', {
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
const titleSlice = createSlice({
    name: 'title',
    initialState: {
      data: null,
      status: 'idle',
      error: null
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchTitle.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchTitle.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.data = action.payload.title;
        })
        .addCase(fetchTitle.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        });
    }
  });
  
  export default titleSlice.reducer;