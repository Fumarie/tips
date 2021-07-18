import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import {DOMAIN} from '../constaint'
import {SignDataInterface} from '../Pages/Login/signDataInterface'


interface authState {
    id: number | null
    error: any
    loading: boolean
}

const initialState: authState = {
    id: null,
    error: null,
    loading: false
}


export const register = createAsyncThunk(
    'auth/register',
    async (data: SignDataInterface, {dispatch, rejectWithValue}) => {
        dispatch(setLoading(true))
        try {
            const url = `${DOMAIN}/api/user/registration`
            const response = await axios.post(url, {...data}).then(response => response.data)
            localStorage.setItem('tipsId', response)
            return response;
        } catch (e) {
            if (!e.response) throw e
            return rejectWithValue(e.response.data)
        }
        finally {
            dispatch(setLoading(false))
        }
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async (data: SignDataInterface, {dispatch, rejectWithValue}) => {
        dispatch(setLoading(true))
        try {
            const url = `${DOMAIN}/api/user/login`
            const response = await axios.post(url, {...data}).then(response => response.data)
            localStorage.setItem('tipsId', response)
            return response;
        } catch (e) {
            if (!e.response) throw e
            return rejectWithValue(e.response.data)
        }
        finally {
            dispatch(setLoading(false))
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload
        },
        setAuth(state, action) {
            state.id = action.payload
        },
        clearAuth: () => {
            return {...initialState, id: 0}
        },
        clearError: (state) => {
            state.error = null
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

export const { setAuth, setLoading, clearAuth, clearError } = authSlice.actions;

export default authSlice.reducer;