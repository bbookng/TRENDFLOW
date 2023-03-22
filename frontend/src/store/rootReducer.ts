import { combineReducers } from '@reduxjs/toolkit';
import themeReducer from '@/store/slices/themeSlice';
import testSlice from '@/store/slices/testSlice';
import navbarSlice from '@/store/slices/navbarSlice';

const rootReducer = combineReducers({
  isDark: themeReducer,
  test: testSlice,
  isNavbar: navbarSlice,
});

export default rootReducer;
