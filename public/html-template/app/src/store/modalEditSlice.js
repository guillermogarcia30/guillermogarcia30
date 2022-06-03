import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  id: '',
  appName: '',
  fabricante: '',
  website: '',
  appurls: '',
  secret: ''
};


export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.open = true
      state.id = action.payload.id
      state.appName = action.payload.title
      state.fabricante = action.payload.fabricante
      state.website = action.payload.website
      state.appurls = action.payload.appurls
      state.secret = action.payload.secret
      
    },
    hideModal: (state) => {
      state.open = false
      state.id = ''
      state.appName = ''
    }
  },
});

export const { showModal, hideModal } = modalSlice.actions;


export const modalSubscribed = (state) => state.modal;


export default modalSlice.reducer;
