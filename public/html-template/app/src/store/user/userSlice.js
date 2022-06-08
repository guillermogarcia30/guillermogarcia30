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
    image: ''
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
            state.address = action.payload.address? action.payload.address : 'Direccion no especificada'
            state.phone = action.payload.phone? action.payload.phone : ''
            state.position = action.payload.position ? action.payload.position : 'Posicon laboral no especificada'
            state.image = action.payload.image ? action.payload.image : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
            state.ciudad = action.payload.ciudad ? action.payload.ciudad : 'Ciudad no especificada'
            state.pais = action.payload.pais ? action.payload.ciudad : 'Pais no especificado'
        },
        setUserImg: (state, action) => {
            state.image = action.payload.image
        }
    }
})

export const { seTtoken, setUserData } = userSlice.actions

export default userSlice.reducer