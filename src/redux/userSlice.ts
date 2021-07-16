import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { DOMAIN } from '../constaint'

export interface userInterface {
    id: number | null
    name: string | null
    password: null
    email: string | null
    phone: string | null
    fullName: string | null
}

interface userStateInterface {
    user: userInterface
    loading: boolean
}

const initialState: userStateInterface = {
    user: {
        id: null,
        name: null,
        password: null,
        email: null,
        phone: null,
        fullName: null
    },
    loading: false
}

export const getUser = createAsyncThunk(
    'user/getUser',
    async (id: number, thunkApi) => {
        thunkApi.dispatch(setLoading(true))
        try {
            const url = `${DOMAIN}/api/user/${id}`
            const response = await axios.get<userInterface>(url)
            return response.data;
        } catch (e) {
            if (!e.response) throw e
            return thunkApi.rejectWithValue(e.response.data)
        }
        finally {
            thunkApi.dispatch(setLoading(false))
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload
            })
    },
})

export const { setLoading } = userSlice.actions;

export default userSlice.reducer;