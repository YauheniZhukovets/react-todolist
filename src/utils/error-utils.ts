import {setAppErrorAC, setAppStatusAC,} from '../app/app-reducer'
import {ResponseType} from '../api/todolists-api'
import {AxiosError} from 'axios';
import {Dispatch} from 'redux';

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch, showError = true) => {
    if (showError) {
        dispatch(setAppErrorAC({error: data.messages.length ? data.messages[0] : 'Some error occurred'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleAsyncServerAppError = <D>(data: ResponseType<D>, thunkAPI: any, showError = true) => {
    if (showError) {
        thunkAPI.dispatch(setAppErrorAC({error: data.messages.length ? data.messages[0] : 'Some error occurred'}))
    }
    thunkAPI.dispatch(setAppStatusAC({status: 'failed'}))
    return thunkAPI.rejectWithValue({errors: data.messages, fieldsError: data.fieldsErrors})
}

export const handleServerNetworkError = (error: AxiosError, dispatch: Dispatch, showError = true) => {
    if (showError) {
        dispatch(setAppErrorAC({error: error.message ? error.message : 'Some error occurred'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}
export const handleAsyncServerNetworkError = (error: AxiosError, thunkAPI: any, showError = true) => {
    if (showError) {
        thunkAPI.dispatch(setAppErrorAC({error: error.message ? error.message : 'Some error occurred'}))
    }
    thunkAPI.dispatch(setAppStatusAC({status: 'failed'}))
    return thunkAPI.rejectWithValue({errors: [error.message], fieldsError: undefined})
}