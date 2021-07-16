import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { DOMAIN } from '../constaint'

export interface cardInterface {
    userId: number
    id: number
    number: string
    balance: number
    valid: string
    cvv: number
    virtual: number
}

interface cardsStateInterface {
    cards: cardInterface[]
    loading: true | false
}

const initialState: cardsStateInterface = {
    cards: [],
    loading: false
}

export const getCards = createAsyncThunk(
    'card/getCards',
    async (userId: number, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true))
        const url = `${DOMAIN}/api/card/${userId}`
        const response = await axios.get<cardInterface[]>(url)
        return response.data;
    }
)


export const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCards.fulfilled, (state, action) => {
                state.cards = action.payload
                state.loading = false
            })
            .addCase(getCards.rejected, (state) => {
                state.loading = false
            })
    },
})

export const { setLoading } = cardSlice.actions;

export default cardSlice.reducer;