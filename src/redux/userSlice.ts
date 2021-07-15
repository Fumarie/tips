import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { DOMAIN } from '../constaint'

export interface userInterface {
    id: number | null
    name: string | null
    password: null
    email: string | null
    phone: string | null
    isAdmin: 1 | 0 | null
    fullName: string | null
}

interface userStateInterface {
    user: userInterface
}

const initialState: userStateInterface = {
    user: {
        id: null,
        name: null,
        password: null,
        email: null,
        phone: null,
        isAdmin: null,
        fullName: null
    }
}

export const getUser = createAsyncThunk(
    'user/getUser',
    async (id: number) => {
        const url = `${DOMAIN}/api/user/${id}`
        const response = await axios.get(url)
        return response.data;
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload
            })
    },
})

// export const {} = userSlice.actions;

export default userSlice.reducer;