import { combineReducers } from '@reduxjs/toolkit';
import themeReducer from '@/store/slices/themeSlice';
import testSlice from '@/store/slices/testSlice';
import { keywordApi } from '@/apis/main';

const rootReducer = combineReducers({
  isDark: themeReducer,
  test: testSlice,
  [keywordApi.reducerPath]: keywordApi.reducer,
});

export default rootReducer;
