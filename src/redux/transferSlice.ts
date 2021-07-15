import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { DOMAIN } from '../constaint'

interface transferStateInterface {
    error: string
    success: boolean | null
}

const initialState: transferStateInterface = {
    error: '',
    success: null
}

interface IPayTipsData {
    id: number
    amount: number
    comment: string | null
}

export const payTips = createAsyncThunk(
    'transfer/payTips',
    async (data: IPayTipsData, thunkAPI) => {
        try {
            const url = `${DOMAIN}/api/transaction/${data.id}`
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
        }
    }
)

export const transferSlice = createSlice({
    name: 'transfer',
    initialState,
    reducers: {
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

export const { setError, clearError } = transferSlice.actions;

export default transferSlice.reducer;