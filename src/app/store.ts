import {tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import {appReducer} from './app-reducer'
import {authReducer} from '../features/Auth/auth-reducer'
import {ActionCreatorsMapObject, configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {useMemo} from 'react';
import {FieldErrorType} from '../api/todolists-api';

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        todolists: todolistsReducer,
        app: appReducer,
        auth: authReducer
    }
})

export type AppDispatch = typeof store.dispatch
export type AppRootStateType = ReturnType<typeof store.getState>
export type ThunkError = { rejectValue: { errors: Array<string>, fieldsError?: Array<FieldErrorType> } }

//hooks
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export const useActions = <T extends ActionCreatorsMapObject<any>>(actions: T) => {
    const dispatch = useDispatch()

    return useMemo(() => {
        return bindActionCreators(actions, dispatch)

    }, [actions, dispatch])
}

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
