import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  apps: [{
    id: 756415435
  }]
};


export const appSlice = createSlice({
  name: 'apps',
  initialState,
  reducers: {
    addApp: (state, action) => {
      state.apps = [...state.apps, action.payload]
    },
    removeApp: (state, action) => {
      state.apps = state.apps.filter((b) => b.id !== action.payload.id)
    },
  },
});

export const { addApp, removeApp } = appSlice.actions;


export const appsSubscribed = (state) => state.apps.apps;


export default appSlice.reducer;
