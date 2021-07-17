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
    loading: boolean
}

const initialState: cardsStateInterface = {
    cards: [],
    loading: false
}

export const getCards = createAsyncThunk(
    'card/getCards',
    async (userId: number, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true))
        try {
            const url = `${DOMAIN}/api/card/${userId}`
            const response = await axios.get<cardInterface[]>(url)
            return response.data;
        } catch (e) {
            if (!e.response) throw e
            return thunkAPI.rejectWithValue(e.response.data)
        } finally {
            thunkAPI.dispatch(setLoading(false))
        }
    }
)


export const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload
        },
        clearCards(state) {
            state.cards = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCards.fulfilled, (state, action) => {
                state.cards = action.payload
            })
    },
})

export const { setLoading, clearCards } = cardSlice.actions;

export default cardSlice.reducer;