import {todolistsAPI} from '../../api/todolists-api'
import {
    handleAsyncServerAppError,
    handleAsyncServerNetworkError,
} from '../../utils/error-utils'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {asyncActions as asyncTodoActions} from './todolists-reducer';
import {AppRootStateType, ThunkError} from '../../utils/types';
import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    UpdateTaskModelType
} from '../../api/types';
import {setAppStatus} from '../CommonActtions/ApplicationCommonActions';


const initialState: TasksStateType = {}

export const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(asyncTodoActions.addTodolistTC.fulfilled, (state, action) => {
                state[action.payload.id] = []
            })
            .addCase(asyncTodoActions.removeTodolistTC.fulfilled, (state, action) => {
                delete state[action.payload.todolistId]
            })
            .addCase(asyncTodoActions.fetchTodolistsTC.fulfilled, ((state, action) => {
                action.payload.todolists.forEach(tl => state[tl.id] = [])
            }))
            .addCase(fetchTasksTC.fulfilled, ((state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
            }))
            .addCase(removeTaskTC.fulfilled, ((state, action) => {
                const task = state[action.payload.todolistId]
                const index = task.findIndex(t => t.id === action.payload.taskId)
                if (index > -1) {
                    task.splice(index, 1)
                }
            }))
            .addCase(addTaskTC.fulfilled, ((state, action) => {
                state[action.payload.todoListId].unshift(action.payload)
            }))
            .addCase(updateTaskTC.fulfilled, ((state, action) => {
                const task = state[action.payload.todolistId]
                const index = task.findIndex(t => t.id === action.payload.taskId)
                if (index > -1) {
                    task[index] = {...task[index], ...action.payload.model}
                }
            }))
    }
})

//export const tasksReducer = slice.reducer

// thunks
const fetchTasksTC = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, {dispatch}) => {
    dispatch(setAppStatus({status: 'loading'}))
    const res = await todolistsAPI.getTasks(todolistId)
    const tasks = res.data.items
    dispatch(setAppStatus({status: 'succeeded'}))
    return {tasks, todolistId}

})
const removeTaskTC = createAsyncThunk('tasks/removeTask', async (param: { taskId: string, todolistId: string }) => {
    await todolistsAPI.deleteTask(param.todolistId, param.taskId)
    return {taskId: param.taskId, todolistId: param.todolistId}
})

const addTaskTC = createAsyncThunk<TaskType, { title: string, todolistId: string }, ThunkError>
('tasks/addTask', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTask(param.todolistId, param.title)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return res.data.data.item
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI, false);
        }
    } catch (err) {
        const error = err as AxiosError
        return handleAsyncServerNetworkError(error, thunkAPI)
    }
})


const updateTaskTC = createAsyncThunk('task/updateTask', async (param: { taskId: string, model: UpdateDomainTaskModelType, todolistId: string }, thunkAPI) => {
    const state = thunkAPI.getState() as AppRootStateType
    const task = state.tasks[param.todolistId].find(t => t.id === param.taskId)
    if (!task) {
        return thunkAPI.rejectWithValue('task not found in the state')
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
            return handleAsyncServerAppError(res.data, thunkAPI);

        }
    } catch (err) {
        const error = err as AxiosError
        return handleAsyncServerNetworkError(error, thunkAPI);
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


