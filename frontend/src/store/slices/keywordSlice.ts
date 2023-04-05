import { createSlice } from '@reduxjs/toolkit';

type KeywordType = string;

const initialState: KeywordType = '싸피';

export const keywordSlice = createSlice({
  name: 'hot',
  initialState,
  reducers: {
    setHotKeyword: (_, { payload }) => {
      return payload;
    },
  },
});

export const { setHotKeyword } = keywordSlice.actions;

export default keywordSlice.reducer;
