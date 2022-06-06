import { configureStore } from '@reduxjs/toolkit';
import appSlice from './apps/appsSlice';
import modalSlice from './modals/modalEditSlice'
import userSlice from './user/userSlice';

export const store = configureStore({
  reducer: {
    apps: appSlice,
    modal: modalSlice,
    user: userSlice
  },
});