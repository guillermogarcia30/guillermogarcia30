import { configureStore } from '@reduxjs/toolkit';
import appSlice from './appsSlice';

export const store = configureStore({
  reducer: {
    apps: appSlice,
  },
});