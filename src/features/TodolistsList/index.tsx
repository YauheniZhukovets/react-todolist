import {asyncActions as tasksAsyncActions, slice as tasksSlice} from './tasks-reducer';
import {asyncActions as todolistsAsyncActions, slice as todolistSlice} from './todolists-reducer';
import {TodolistsList} from './TodolistsList'


const todolistsActions = {
    ...todolistsAsyncActions,
    ...todolistSlice.actions
}
const todolistsReducer = todolistSlice.reducer

const tasksActions = {
    ...tasksAsyncActions,
    ...tasksSlice.actions
}
const tasksReducer = tasksSlice.reducer


export {
    tasksActions,
    todolistsActions,
    TodolistsList,
    todolistsReducer,
    tasksReducer
}