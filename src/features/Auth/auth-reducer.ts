import {authAPI} from '../../api/todolists-api'
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {FieldErrorType, LoginParamsType} from '../../api/types';
import {setAppStatus} from '../CommonActtions/ApplicationCommonActions';
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from '../../utils/error-utils';


export const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<{ value: boolean }>) => {
            state.isLoggedIn = action.payload.value
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, ((state) => {
                state.isLoggedIn = true
            }))
            .addCase(logout.fulfilled, ((state) => {
                state.isLoggedIn = false
            }))
    }
})

//export const authReducer = slice.reducer
export const {setIsLoggedIn} = slice.actions

// thunks
export const login = createAsyncThunk<undefined, LoginParamsType, { rejectValue: { errors: Array<string>, fieldsError?: Array<FieldErrorType> } }>('auth/login', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    const res = await authAPI.login(param)
    try {
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)

        }
    } catch (err) {
        const error = err as AxiosError
        return handleAsyncServerNetworkError(error, thunkAPI)

    }
})
export const logout = createAsyncThunk('auth/logout', async (arg, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    const res = await authAPI.logout()
    try {
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (err) {
        const error = err as AxiosError
        return handleAsyncServerNetworkError(error, thunkAPI)

    }
})

export const asyncActions = {login, logout}

