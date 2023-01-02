import { configureStore } from '@reduxjs/toolkit';
import { categoryApi } from './apis/categories';
import auth from './slices/authSlice';

const store = configureStore({
  reducer: { [categoryApi.reducerPath]: categoryApi.reducer, auth },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(categoryApi.middleware),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
