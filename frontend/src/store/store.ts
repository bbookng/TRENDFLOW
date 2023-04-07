import { configureStore } from '@reduxjs/toolkit';

// slices
// Redux Persist
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { analyzeApi } from '@/apis/analyze';
import rootReducer from '@/store/rootReducer';
import { keywordApi } from '@/apis/keyword';
import { memberApi } from '@/apis/member';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(keywordApi.middleware)
      .concat(analyzeApi.middleware)
      .concat(memberApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
