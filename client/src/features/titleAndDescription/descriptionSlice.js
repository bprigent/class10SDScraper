import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// front end side of the fetchDescription
export const fetchDescription = createAsyncThunk(
    'description/fetch',
    async (url, thunkAPI) => {
      try {
        const response = await fetch('http://localhost:3001/fetch-description', {
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
  
  
  
  // description slice that goes with the async think bove
  const descriptionSlice = createSlice({
    name: 'description',
    initialState: {
      descriptionData: null,
      descriptionStatus: 'idle',
      descriptionError: null
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchDescription.pending, (state) => {
          state.descriptionStatus = 'loading';
        })
        .addCase(fetchDescription.fulfilled, (state, action) => {
          state.descriptionStatus = 'succeeded';
          state.descriptionData = action.payload.description;
        })
        .addCase(fetchDescription.rejected, (state, action) => {
          state.descriptionStatus = 'failed';
          state.descriptionError = action.payload;
        });
    }
  });
  
  export default descriptionSlice.reducer;