import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface TestDataInterface {
  data: [];
}

const initialState = {
  data: [],
} as TestDataInterface;

export const fetchTestData = createAsyncThunk<TestDataInterface>(
  'testSlice/fetchTestData',
  async () => {
    const res = await axios.get('/test');
    return res;
  }
);

export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTestData.fulfilled, (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.data = payload.data;
    });
  },
});

export default testSlice.reducer;
