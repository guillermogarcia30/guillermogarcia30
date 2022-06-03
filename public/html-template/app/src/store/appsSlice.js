import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  apps: [
    {
    logo:  'https://www.worldartfoundations.com/wp-content/uploads/2022/04/placeholder-image.png',
    title: 'Perrito', 
    token: 'TOKENSITOPAPAPA',
    secret: 'secretosecretoso', 
    status: true  ,
    id: 3,
    fabricante: 'Betabox',
    appurls: 'http://localhost',
    website: 'https://www.betabox.com'
  }
]
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
