import { createSlice } from '@reduxjs/toolkit';

type KeywordType = string;

const initialState: KeywordType = '싸피';

export const keywordSlice = createSlice({
  name: 'keyword',
  initialState,
  reducers: {
    setHotKeyword: (_, { payload }) => {
      console.log(payload);
      return payload;
    },
  },
});

export const { setHotKeyword } = keywordSlice.actions;

export default keywordSlice.reducer;
