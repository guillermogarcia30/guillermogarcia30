import { configureStore } from '@reduxjs/toolkit';
import appSlice from './appsSlice';
import modalSlice from './modalEditSlice'

export const store = configureStore({
  reducer: {
    apps: appSlice,
    modal: modalSlice
  },
});