import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { DOMAIN } from '../constaint'

interface transferStateInterface {
    error: string
    success: boolean | null
    loading: boolean
}

const initialState: transferStateInterface = {
    error: '',
    success: null,
    loading: false
}

interface IPayTipsData {
    userId: number
    amount: number
    comment: string | null
}

export const payTips = createAsyncThunk(
    'transfer/payTips',
    async (data: IPayTipsData, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true))
        try {
            const url = `${DOMAIN}/api/transaction/tip`
            const response = await axios.post(url, {...data})
            if (response.status === 200) {
                console.log(response)
                return response.data;
            } else {
                thunkAPI.dispatch(setError())
            }
        } catch (e) {
            thunkAPI.dispatch(setError())
            if (!e.response) throw e
            return thunkAPI.rejectWithValue(e.response.data)
        } finally {
            thunkAPI.dispatch(setLoading(false))
        }
    }
)

export const transferSlice = createSlice({
    name: 'transfer',
    initialState,
    reducers: {
        setLoading(state, action){
            state.loading = action.payload
        },
        setError(state) {
            state.error = 'Unexpected error'
            state.success = false
        },
        clearError(state) {
            state.success = null
            state.error = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(payTips.fulfilled, (state) => {
                state.success = true
            })
    },
})

export const { setLoading, setError, clearError } = transferSlice.actions;

export default transferSlice.reducer;