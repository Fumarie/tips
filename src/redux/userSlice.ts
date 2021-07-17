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

interface userEditInterface {
    id: number
    fieldName: string
    value: userEditValueInterface
}

interface userEditValueInterface {
    name?: string
    email?: string
    fullName?: string
}

interface userStateInterface {
    user: userInterface
    loading: boolean
    editLoading: any
    editError: any
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
    loading: false,
    editLoading: false,
    editError: ''
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
    }
)

export const editUser = createAsyncThunk(
    'user/editUser',
    async (data: userEditInterface, {dispatch, rejectWithValue}) => {
        dispatch(setEditLoading({[data.fieldName]: true}))
        try {
            const url = `${DOMAIN}/api/user/edit`
            const field = data.fieldName
            const object = {id: data.id, [field]: Object.keys(data.value)[0]}
            await axios.put(url, object)
            if(field === 'fullName')
                dispatch(setFullName(Object.keys(data.value)[0]))
        } catch (e) {
            if (!e.response) throw e
            return rejectWithValue(e.response.data)
        }
        finally {
            dispatch(setEditLoading(false))
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload
        },
        setEditLoading(state, action) {
            state.editLoading = action.payload
        },
        setFullName(state, action) {
            state.user.fullName = action.payload
        },
        clearEditError(state, action) {
            const fieldName =  action.payload
            console.log(fieldName)
            if(typeof state.editError === "object" && state.editError.errors)
                delete state.editError.errors[`${fieldName}`]
        },
        clearUser: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload
                state.loading = false
            })
            .addCase(editUser.rejected, (state, action) => {
                console.log(action)
                state.editError = action.payload
                state.loading = false
            })
    },
})

export const { setLoading, setEditLoading, setFullName, clearEditError, clearUser } = userSlice.actions;

export default userSlice.reducer;