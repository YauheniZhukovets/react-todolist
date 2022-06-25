import {tasksReducer, todolistsReducer} from '../features/TodolistsList';
import {appReducer} from '../features/Application'
import {authReducer} from '../features/Auth'
import {configureStore} from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        todolists: todolistsReducer,
        app: appReducer,
        auth: authReducer
    }
})

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
