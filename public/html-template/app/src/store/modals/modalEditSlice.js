import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  onError: false,
  onSucces: false,
  changeProfilePic: false,
  id: '',
  appName: '',
  fabricante: '',
  website: '',
  appurls: '',
  secret: '',
  errorMsg: 'Por favor intenta de nuevo mas tarde',
  changeOk: false
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
    },
    onSuccesOpen: (state) => {
      state.onSucces = true
    },
    onSuccesClose: (state) => {
      state.onSucces = false
    },
    onErrorOpen: (state) => {
      console.log(state.onError)
      state.onError = true
    },
    onErrorClose: (state) => {
      state.onError = false
    },
    onProfilePicOpen: (state) => {
      state.changeProfilePic = true
    },
    onProfilePicClose: (state) => {
      state.changeProfilePic = false
    },
    setChangeOk: (state, actions) => {
      state.changeOk = actions.payload.ok
    },
    setMsg: (state, actions) => {
      if (actions.payload.msg) {
         return state.errorMsg = actions.payload.msg
      }
      state.errorMsg = 'Por favor intenta de nuevo mas tarde'
    }
  },
});

export const { showModal, hideModal, onErrorClose, onErrorOpen, onSuccesClose, onSuccesOpen, onProfilePicOpen, onProfilePicClose, setChangeOk, setMsg } = modalSlice.actions;


export const modalSubscribed = (state) => state.modal;


export default modalSlice.reducer;
