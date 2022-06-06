import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: '123456789',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        seTtoken: (state, action) => {
            state.token = action.payload.token
        },
    }
})

export const { seTtoken } = userSlice.actions

export default userSlice.reducer