import { combineReducers } from '@reduxjs/toolkit';
import themeReducer from '@/store/slices/themeSlice';
<<<<<<< HEAD
import testSlice from '@/store/slices/testSlice';
import { keywordApi } from '@/apis/main';

const rootReducer = combineReducers({
  isDark: themeReducer,
  test: testSlice,
  [keywordApi.reducerPath]: keywordApi.reducer,
=======
import testReducer from '@/store/slices/testSlice';
import navbarReducer from '@/store/slices/navbarSlice';

const rootReducer = combineReducers({
  isDark: themeReducer,
  test: testReducer,
  isNavbar: navbarReducer,
>>>>>>> e98548bf535b5c455b8642ced6c33f591ce955b5
});

export default rootReducer;
