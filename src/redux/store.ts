import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import authReducer from './authSlice'
import cardReducer from './cardSlice'
import transferReducer from './transferSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        card: cardReducer,
        transfer: transferReducer
    },
})

export type RootState = ReturnType<typeof store.getState>

