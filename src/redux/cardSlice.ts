import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { DOMAIN } from '../constaint'

export interface cardInterface {
    userId: number
    id: number
    number: string
    balance: number
    valid: "string"
    cvv: number
    virtual: number
}

interface cardsStateInterface {
  cards: cardInterface[]
}

const initialState: cardsStateInterface = {
    cards: []
}

export const getCards = createAsyncThunk(
    'card/getCards',
    async (userId: number) => {
        const url = `${DOMAIN}/api/card/${userId}`
        const response = await axios.get<cardInterface[]>(url)
        return response.data;
    }
)


export const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCards.fulfilled, (state, action) => {
                state.cards = action.payload
            })
    },
})

// export const {} = userSlice.actions;

export default cardSlice.reducer;