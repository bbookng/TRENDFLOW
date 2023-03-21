import { createSlice } from '@reduxjs/toolkit';

type ThemeState = boolean;

const initialState: ThemeState = false;

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newState = !state;
      return newState;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
