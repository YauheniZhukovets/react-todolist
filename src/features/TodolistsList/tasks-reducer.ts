import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../../api/todolists-api'
import {AppRootStateType} from '../../app/store'
import {setAppStatusAC} from '../../app/app-reducer'
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {asyncActions as asyncTodoActions} from './todolists-reducer';

const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(asyncTodoActions.addTodolistTC.fulfilled, (state, action) => {
            state[action.payload.id] = []
        })
        builder.addCase(asyncTodoActions.removeTodolistTC.fulfilled, (state, action) => {
            delete state[action.payload.todolistId]
        })
        builder.addCase(asyncTodoActions.fetchTodolistsTC.fulfilled, ((state, action) => {
            action.payload.todolists.forEach(tl => state[tl.id] = [])
        }))
        builder.addCase(fetchTasksTC.fulfilled, ((state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        }))
        builder.addCase(removeTaskTC.fulfilled, ((state, action) => {
            const task = state[action.payload.todolistId]
            const index = task.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                task.splice(index, 1)
            }
        }))
        builder.addCase(addTaskTC.fulfilled, ((state, action) => {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        }))
        builder.addCase(updateTaskTC.fulfilled, ((state, action) => {
            const task = state[action.payload.todolistId]
            const index = task.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                task[index] = {...task[index], ...action.payload.model}
            }
        }))
    }
})

export const tasksReducer = slice.reducer

// thunks
const fetchTasksTC = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, {dispatch}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.getTasks(todolistId)
    const tasks = res.data.items
    dispatch(setAppStatusAC({status: 'succeeded'}))
    return {tasks, todolistId}

})
const removeTaskTC = createAsyncThunk('tasks/removeTask', async (param: { taskId: string, todolistId: string }) => {
    await todolistsAPI.deleteTask(param.todolistId, param.taskId)
    return {taskId: param.taskId, todolistId: param.todolistId}
})
const addTaskTC = createAsyncThunk('tasks/addTask', async (param: { title: string, todolistId: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.createTask(param.todolistId, param.title)
    try {
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            const task = res.data.data.item
            return {task}
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null)
        }
    } catch (err) {
        const error = err as AxiosError
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})
const updateTaskTC = createAsyncThunk('task/updateTask', async (param: { taskId: string, model: UpdateDomainTaskModelType, todolistId: string }, {
    dispatch, getState, rejectWithValue
}) => {
    const state = getState() as AppRootStateType
    const task = state.tasks[param.todolistId].find(t => t.id === param.taskId)
    if (!task) {
        return rejectWithValue('task not found in the state')
    }
    const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...param.model
    }

    const res = await todolistsAPI.updateTask(param.todolistId, param.taskId, apiModel)
    try {
        if (res.data.resultCode === 0) {
            return param
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null)
        }
    } catch (err) {
        const error = err as AxiosError
        handleServerNetworkError(error, dispatch);
        return rejectWithValue(null)
    }
})

export const asyncActions = {fetchTasksTC, removeTaskTC, addTaskTC, updateTaskTC}

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}


