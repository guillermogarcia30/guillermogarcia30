import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: '',
    email: '',
    tenant: '',
    tenant_img: '',
    tenant_name: '',
    ciudad: '',
    country_id: '',
    country_name: '',
    name: '',
    birthDate: '',
    address: '',
    phone: '',
    position: '',
    image: '',
    loadingChange: false,
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
            state.tenant_img = action.payload.tenant_img ? action.payload.tenant_img : ''
            state.tenant_name = action.payload.tenant_name ? action.payload.tenant_name : ''
            state.name = action.payload.name ? action.payload.name : ''
            state.birthDate = action.payload.birthDate? action.payload.birthDate : ''
            state.address = action.payload.address? action.payload.address : 'Dirección no especificada'
            state.phone = action.payload.phone? action.payload.phone : ''
            state.position = action.payload.position ? action.payload.position : 'Posición laboral no especificada'
            state.image = action.payload.image ? action.payload.image : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
            state.ciudad = action.payload.ciudad ? action.payload.ciudad : 'Ciudad no especificada'
            state.country_id = action.payload.country_id ? action.payload.ciudad : ''
            state.country_name = action.payload.country_name ? action.payload.country_name : 'País no especificado'
            state.state = action.payload.state ? action.payload.state : 'Estado no especificado'
        },
        updateUserData: (state, action) => {
            state.email = action.payload.email
            state.birthDate = action.payload.birthDate? action.payload.birthDate : ''
            state.address = action.payload.address? action.payload.address : 'Dirección no especificada'
            state.phone = action.payload.phone? action.payload.phone : ''
            state.position = action.payload.position ? action.payload.position : 'Posición laboral no especificada'
            state.ciudad = action.payload.ciudad ? action.payload.ciudad : 'Ciudad no especificada'
            state.country_id = action.payload.country_id ? action.payload.country_id : ''
            state.country_name = action.payload.country_name ? action.payload.country_name : 'País no especificado'
            state.state = action.payload.state ? action.payload.state : 'Estado no especificado'
        },
        setUserImg: (state, action) => {
            state.image = action.payload.image
        },
        setChangeLoading: (state, action) => {
            state.loadingChange = action.payload.ok
        }
    }
})

export const { seTtoken, setUserData, setUserImg, updateUserData, setChangeLoading } = userSlice.actions

export default userSlice.reducer

// token: '',
// email: 'edward@hotmail.com',
// tenant: '11e730db-c00b-4fd5-b7ba-5e14a84ba91d',
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



// token: '',
// email: '',
// tenant: '',
// ciudad: '',
// pais: '',
// name: '',
// birthDate: '',
// address: '',
// phone: '',
// position: '',
// image: '',
// profilePicCHangeLoading: false,
// state: ''