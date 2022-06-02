import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  apps: []
};


export const appSlice = createSlice({
  name: 'apps',
  initialState,
  reducers: {
    clearApps: (state) => {
      console.log('borrado')
      state.apps = []
    },
    addApp: (state, action) => {
      state.apps = [...state.apps, action.payload]
    },
    removeApp: (state, action) => {
      state.apps = state.apps.filter((b) => b.id !== action.payload.id)
    },
  },
});

export const { addApp, removeApp, clearApps } = appSlice.actions;


export const appsSubscribed = (state) => state.apps.apps;


export default appSlice.reducer;
