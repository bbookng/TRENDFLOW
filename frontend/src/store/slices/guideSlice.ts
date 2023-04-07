import { createSlice } from '@reduxjs/toolkit';

interface GuideInterface {
  main?: boolean;
  social?: boolean;
  youtube?: boolean;
  comparison?: boolean;
}

const initialState: GuideInterface = {
  main: true,
  social: true,
  youtube: true,
  comparison: true,
};

export const guideSlice = createSlice({
  name: 'guide',
  initialState,
  reducers: {
    toggleGuide: (state, { payload }) => {
      const newState = { ...state, ...payload };
      return newState;
    },
  },
});

export const { toggleGuide } = guideSlice.actions;

export default guideSlice.reducer;
