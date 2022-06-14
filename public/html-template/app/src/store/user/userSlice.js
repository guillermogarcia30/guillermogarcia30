import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: '',
    email: '',
    tenant: '',
    ciudad: '',
    pais: '',
    name: '',
    birthDate: '',
    address: '',
    phone: '',
    position: '',
    image: '',
    profilePicCHangeLoading: false,
    state: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        seTtoken: (state, action) => {
            state.token = action.payload.token
        },
        setUserData: (state, action ) => {
            state.email = action.payload.email
            state.tenant = action.payload.tenant? action.payload.tenant : ''
            state.name = action.payload.name
            state.birthDate = action.payload.birthDate? action.payload.birthDate : ''
            state.address = action.payload.address? action.payload.address : 'Dirección no especificada'
            state.phone = action.payload.phone? action.payload.phone : ''
            state.position = action.payload.position ? action.payload.position : 'Posición laboral no especificada'
            state.image = action.payload.image ? action.payload.image : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
            state.ciudad = action.payload.ciudad ? action.payload.ciudad : 'Ciudad no especificada'
            state.pais = action.payload.pais ? action.payload.ciudad : 'País no especificado'
            state.state = action.payload.state ? action.payload.state : 'Estado no especificado'
        },
        updateUserData: (state, action) => {
            state.email = action.payload.email
            state.birthDate = action.payload.birthDate? action.payload.birthDate : ''
            state.address = action.payload.address? action.payload.address : 'Dirección no especificada'
            state.phone = action.payload.phone? action.payload.phone : ''
            state.position = action.payload.position ? action.payload.position : 'Posición laboral no especificada'
            state.ciudad = action.payload.ciudad ? action.payload.ciudad : 'Ciudad no especificada'
            state.pais = action.payload.pais ? action.payload.pais : 'País no especificado'
            state.state = action.payload.state ? action.payload.state : 'Estado no especificado'
        },
        setUserImg: (state, action) => {
            state.image = action.payload.image
        },
        setPicLoandig: (state, action) => {
            state.profilePicCHangeLoading = action.payload.ok
        }
    }
})

export const { seTtoken, setUserData, setUserImg, updateUserData, setPicLoandig } = userSlice.actions

export default userSlice.reducer

// token: '',
// email: 'edward@hotmail.com',
// tenant: '',
// ciudad: 'Aragua',
// pais: 'Venezuela',
// name: 'Edward Colmenarez',
// birthDate: '18/09/2000',
// address: 'Caña de azúcar sector 2',
// phone: '+58 424-356-7502',
// position: 'Programador frontend en betabox',
// image: 'https://s1.zerochan.net/Son.Goku.%28DRAGON.BALL%29.600.1275212.jpg',
// profilePicCHangeLoading: false,
// state: 'Aragua'