import { combineReducers } from '@reduxjs/toolkit';
import themeReducer from '@/store/slices/themeSlice';
import testReducer from '@/store/slices/testSlice';
import navbarReducer from '@/store/slices/navbarSlice';
import loginReducer from '@/store/slices/loginSlice';

const rootReducer = combineReducers({
  isDark: themeReducer,
  test: testReducer,
  isNavbar: navbarReducer,
  isLogin: loginReducer,
});

export default rootReducer;
