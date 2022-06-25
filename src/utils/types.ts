import {store} from '../app/store';
import {FieldErrorType} from '../api/types';

export type AppDispatch = typeof store.dispatch
export type AppRootStateType = ReturnType<typeof store.getState>
export type ThunkError = { rejectValue: { errors: Array<string>, fieldsError?: Array<FieldErrorType> } }