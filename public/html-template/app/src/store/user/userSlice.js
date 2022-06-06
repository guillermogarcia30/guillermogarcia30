import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: '123456789',
    email: 'edwardcolmenarez89@gmail.com',
    tenant: '',
    ciudad: 'Maracay',
    pais: 'Arabia saudita',
    name: 'Edward Colmenarez',
    birthDate: '18/09/200',
    address: 'Caña de azúcar sector 2 vereda 15 casa 98',
    phone: '+58 424-356-7502',
    position: 'Programador front-end en Betabox Technologies',
    image: 'http://vignette2.wikia.nocookie.net/joke-battles/images/0/09/Goku.png/revision/latest?cb=20151230234609'
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
            state.image = action.payload.image ? action.payload.image : 'https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png'
            state.ciudad = action.payload.ciudad ? action.payload.ciudad : 'Ciudad no especificada'
            state.pais = action.payload.pais ? action.payload.ciudad : 'Pais no especificado'
        }
    }
})

export const { seTtoken, setUserData } = userSlice.actions

export default userSlice.reducer