import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';

// slices
// Redux Persist
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import counterSlice from '@/store/slices/counterSlice';

const persistConfig = {
  key: 'root',
  storage,
  whiteList: ['userSlice'],
};

const rootReducer = combineReducers({
  counterSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    // {ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]},
  }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
