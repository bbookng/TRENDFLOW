import { createSlice } from '@reduxjs/toolkit';

type KeywordType = string;

const initialState: KeywordType = '시장';

export const keywordSlice = createSlice({
  name: 'keyword',
  initialState,
  reducers: {
    setHotKeyword: (_, { payload }) => {
      return payload;
    },
  },
});

export const { setHotKeyword } = keywordSlice.actions;

export default keywordSlice.reducer;
