import {setAppStatusAC} from '../../app/app-reducer'
import {authAPI, FieldErrorType, LoginParamsType} from '../../api/todolists-api'
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils'
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedInAC: (state, action: PayloadAction<{ value: boolean }>) => {
            state.isLoggedIn = action.payload.value
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginTC.fulfilled, ((state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        }))
    }
})

export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions

// thunks
export const loginTC = createAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType, { rejectValue: { errors: Array<string>, fieldsError?: Array<FieldErrorType> } }>('auth/login', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    const res = await authAPI.login(param)
    try {
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {isLoggedIn: true}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsError: res.data.fieldsErrors})
        }
    } catch (err) {
        const error = err as AxiosError
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsError: undefined})
    }
})
export const logoutTC = createAsyncThunk('auth/logout', async (arg, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    const res = await authAPI.logout()
    try {
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            thunkAPI.dispatch(setIsLoggedInAC({value: false}))
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
        }
    } catch (err) {
        const error = err as AxiosError
        handleServerNetworkError(error, thunkAPI.dispatch)
    }
})



