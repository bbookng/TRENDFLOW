import { combineReducers } from '@reduxjs/toolkit';
import themeReducer from '@/store/slices/themeSlice';

const rootReducer = combineReducers({ isDark: themeReducer });

export default rootReducer;
