import {authAPI} from '../../api/todolists-api'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {setIsLoggedIn} from '../Auth/auth-reducer';
import {setAppError, setAppStatus} from '../CommonActtions/ApplicationCommonActions';
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from '../../utils/error-utils';

export const slice = createSlice({
    name: 'application',
    initialState: {
        status: 'idle',
        error: null,
        isInitialized: false
    } as InitialStateType,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(initializeApp.fulfilled, (state) => {
            state.isInitialized = true
        })
            .addCase(setAppStatus, (state, action) => {
                state.status = action.payload.status
            })
            .addCase(setAppError, (state, action) => {
                state.error = action.payload.error
            })
    }
})

//export const appReducer = slice.reducer
//export const {setAppStatus, setAppError} = slice.actions


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}

//thunk
const initializeApp = createAsyncThunk('application/initializeApp', async (arg, thunkAPI) => {
    const res = await authAPI.me()
    try {
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setIsLoggedIn({value: true}));
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI);
        }
    } catch (err) {
        const error = err as AxiosError
        return handleAsyncServerNetworkError(error, thunkAPI)
    }
})

export const asyncActions = {
    initializeApp
}

