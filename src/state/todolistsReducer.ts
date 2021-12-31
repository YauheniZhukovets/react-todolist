import {FilterValuesType, TodoListType} from '../App';
import {v1} from 'uuid';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
}
export type ChangeTodolistActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistActionType
    | ChangeTodolistFilterActionType

export const todolistsReducer = (state: Array<TodoListType>, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return [...state.filter(tl => tl.id !== action.id)]
        }
        case 'ADD-TODOLIST': {
            return [...state, {id: v1(), title: action.title, filter: 'all'}]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return [...state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return [...state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)]
        }
        default:
            return state
    }
}

export const RemoveTodolistAC = (id: string): RemoveTodolistActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        id: id
    }
}

export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {
        type: 'ADD-TODOLIST',
        title: title
    }
}

export const ChangeTodolistAC = (id: string, title: string): ChangeTodolistActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: id,
        title: title
    }
}

export const ChangeTodolistFilterAC = (id: string,filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: id,
        filter:filter
    }
}
