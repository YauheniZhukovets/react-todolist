import React from 'react';
import {TaskType} from "../Todolist";
import {v1} from "uuid";

let initialState:Array<TaskType> = [
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false},
    {id: v1(), title: "Rest API", isDone: false},
    {id: v1(), title: "GraphQL", isDone: false},
]
export const TasksReducer = (state=initialState, action: tsarType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let newState = [...state];
            //let filteredTasks = tasks.filter(t => t.id != id);
            console.log('Hellow')
            return newState.filter(f => f.id !== action.id)
        }
        case "ADD-TASK":{
            let newState = [...state];
            return [{ id: v1(), title: action.payload.title, isDone: false },...newState]
        }
        default:
            return state
    }
};

type tsarType = removeTaskACType | addTaskACType

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string) => {
    return {
        type: 'REMOVE-TASK',
        id: id
    } as const
}

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title: title,
        }
    }as const
}