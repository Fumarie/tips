import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import {DOMAIN} from '../constaint'
import {SignDataInterface} from '../Pages/Login/signDataInterface'


interface authState {
    id: number | null
    error: any
}

const initialState: authState = {
    id: null,
    error: null,
}


export const register = createAsyncThunk(
    'auth/register',
    async (data: SignDataInterface, {rejectWithValue}) => {
        try {
            const url = `${DOMAIN}/api/user/registration`
            const response = await axios.post(url, {...data}).then(response => response.data)
            localStorage.setItem('tipsId', response)
            return response;
        } catch (e) {
            if (!e.response) throw e
            return rejectWithValue(e.response.data)
        }
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async (data: SignDataInterface, {rejectWithValue}) => {
        try {
            const url = `${DOMAIN}/api/user/login`
            const response = await axios.post(url, {...data}).then(response => response.data)
            localStorage.setItem('tipsId', response)
            return response;
        } catch (e) {
            if (!e.response) throw e
            return rejectWithValue(e.response.data)
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state, action) {
            state.id = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.id = action.payload
                localStorage.setItem('tipsId', action.payload)
            })
            .addCase(login.rejected, (state, action) => {
                if (action.payload) {
                    state.error = action.payload
                } else {
                    state.error = action.error.message
                }
            })
            .addCase(register.fulfilled, (state, action) => {
                state.id = action.payload
                localStorage.setItem('tipsId', action.payload)
            })
            .addCase(register.rejected, (state, action) => {
                if (action.payload) {
                    state.error = action.payload
                } else {
                    state.error = action.error.message
                }
            })
    },
})

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;