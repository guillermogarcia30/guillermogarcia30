import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  apps: [
  //   {
  //   logo:  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png',
  //   title: 'Perrito', 
  //   token: 'TOKENSITOPAPAPAty7u98iq0wdokpkqedowqldp',
  //   secret: 'secretosecretoso', 
  //   status: true  ,
  //   id: 3,
  //   fabricante: 'Betabox',
  //   appurls: 'http://localhost',
  //   website: 'https://www.betabox.com'
  // }
  ],
  authorizedApps: [],
  AppsBackup: [],
  loading: true
};


export const appSlice = createSlice({
  name: 'apps',
  initialState,
  reducers: {
    addApp: (state, action) => {
      state.apps = [ action.payload]
    },
    removeApp: (state, action) => {
      state.apps = state.apps.filter((b) => b.id !== action.payload.id)
    },
    setLoadingFalse: (state) => {
      state.loading = false
    },
    setAuthorizedApps: (state, action) => {
      state.authorizedApps = [ action.payload]
    }
  },
});

export const { addApp, removeApp, setLoadingFalse, setAuthorizedApps } = appSlice.actions;


export const appsSubscribed = (state) => state.apps.apps;


export default appSlice.reducer;
