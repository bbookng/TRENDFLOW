import { combineReducers } from '@reduxjs/toolkit';
import themeReducer from '@/store/slices/themeSlice';
import testReducer from '@/store/slices/testSlice';
import navbarReducer from '@/store/slices/navbarSlice';
import userReducer from '@/store/slices/userSlice';
import { keywordApi } from '@/apis/main';

const rootReducer = combineReducers({
  isDark: themeReducer,
  test: testReducer,
  isNavbar: navbarReducer,
  user: userReducer,
  [keywordApi.reducerPath]: keywordApi.reducer,
});

export default rootReducer;
