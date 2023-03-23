import { createSlice } from '@reduxjs/toolkit';

type NavbarState = boolean;

const initialState: NavbarState = false;

export const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    closeNavbar: (state) => {
      if (state) return state;
      const newState = !state;
      return newState;
    },
    openNavbar: (state) => {
      if (!state) return state;
      const newState = !state;
      return newState;
    },
  },
});

export const { openNavbar, closeNavbar } = navbarSlice.actions;

export default navbarSlice.reducer;
