import {AxiosError} from 'axios';
import {ResponseType} from '../api/types';
import {setAppError, setAppStatus} from '../features/CommonActtions/ApplicationCommonActions';

export const handleAsyncServerAppError = <D>(data: ResponseType<D>, thunkAPI: any, showError = true) => {
    if (showError) {
        thunkAPI.dispatch(setAppError({error: data.messages.length ? data.messages[0] : 'Some error occurred'}))
    }
    thunkAPI.dispatch(setAppStatus({status: 'failed'}))
    return thunkAPI.rejectWithValue({errors: data.messages, fieldsError: data.fieldsErrors})
}

export const handleAsyncServerNetworkError = (error: AxiosError, thunkAPI: any, showError = true) => {
    if (showError) {
        thunkAPI.dispatch(setAppError({error: error.message ? error.message : 'Some error occurred'}))
    }
    thunkAPI.dispatch(setAppStatus({status: 'failed'}))
    return thunkAPI.rejectWithValue({errors: [error.message], fieldsError: undefined})
}