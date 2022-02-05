import {useEffect, useState} from 'react';
import {todolistAPI} from '../api/todolist-api';


export default {
    title: 'API',
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodo()
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'newTodolist'
        todolistAPI.createTodo(title).then((res) => {
            setState(res.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "28938019-4729-4a5f-89c9-c30bfbe9593b"
        todolistAPI.deleteTodo(todolistId).then((res) => {
            setState(res.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = '<<<<<<<<REACT>>>>>>>>>'
        const todolistId = '28938019-4729-4a5f-89c9-c30bfbe9593b'
        todolistAPI.updateTodo(todolistId, title)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "28938019-4729-4a5f-89c9-c30bfbe9593b";
        todolistAPI.getTask(todolistId)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '28938019-4729-4a5f-89c9-c30bfbe9593b';
        const title = 'NEW-TASK'
        todolistAPI.createTask(todolistId, title).then((res) => {
            setState(res.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '28938019-4729-4a5f-89c9-c30bfbe9593b';
        const taskId = '1479f199-5b35-4434-8640-c960eaa66c6d'
        todolistAPI.deleteTask(todolistId, taskId).then((res) => {
            setState(res.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "28938019-4729-4a5f-89c9-c30bfbe9593b";
        const taskId = '1479f199-5b35-4434-8640-c960eaa66c6d';
        const payload = {
            deadline: null,
            description: '6666666',
            priority: 66,
            startDate: null,
            status: 6,
            title: '66666666666666',
            completed: false,
        }

        todolistAPI.updateTask(todolistId, taskId, {...payload}).then((res) => {
            setState(res.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
