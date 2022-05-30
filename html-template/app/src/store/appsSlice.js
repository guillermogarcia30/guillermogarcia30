import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  apps: [{
    logo: 'https://www.pngmart.com/files/16/official-Google-Logo-PNG-Image.png',
    id: 1,
    title: 'Google',
    token: '8965tegr451f2w62',
    secret: '********5488',
    status: true,
},
{
    logo: 'https://logodownload.org/wp-content/uploads/2014/09/facebook-logo-3-1.png',
    id: 2,
    title: 'Facebook',
    token: '2894fw5a6f45132',
    secret: '********4564',
    status: true,
},
{
    logo: 'https://logodownload.org/wp-content/uploads/2014/09/twitter-logo-3.png',
    id: 3,
    title: 'Twitter',
    token: '48541csaacdv32546',
    secret: '*********7984',
    status: false,
},
{
    logo: 'https://logodownload.org/wp-content/uploads/2020/07/tesla-logo-8.png',
    id: 4,
    title: 'Tesla',
    token: '78941014fscdsedf520',
    secret: '********8952',
    status: true,
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
