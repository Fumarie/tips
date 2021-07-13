import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { DOMAIN } from '../constaint'

interface userInterface {
    id: number
    name: string | null
    password: null
    email: string | null
    phone: string | null
    isAdmin: 1 | 0
    fullName: string | null
}

interface userStateInterface {
    user: userInterface
}

const initialState: userStateInterface = {
    user: {
        id: 30,
        name: null,
        password: null,
        email: null,
        phone: null,
        isAdmin: 0,
        fullName: null
    }
}

export const getUser = createAsyncThunk(
    'user/getUser',
    async (id: number) => {
        const url = `${DOMAIN}/api/user/${id}`
        // const url = 'https://jsonplaceholder.typicode.com/todos/1'
        console.log(url)
        const response = await axios.get(url)
        console.log(response.data)
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

// export const {} = magazineSlice.actions;

export default userSlice.reducer;