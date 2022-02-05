import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers: {
        'API-KEY': '6b986b64-b31b-4013-a97c-d743f4ca9a13',
    }
})


export const todolistAPI = {
    getTodo() {
        return instance.get<TodoType[]>('/')
    },
    createTodo(title: string) {
        return instance.post<BaseTodoListType<{item: TodoType}>>('/', {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<BaseTodoListType>(`/${todolistId}`)
    },
    updateTodo(todolistId: string, title: string) {
        return instance.put<BaseTodoListType>(`/${todolistId}`, {title})
    },
    getTask(todolistId: string) {
        return instance.get(`/${todolistId}/tasks`)
    },
    createTask(todolistId:string,title:string) {
        return instance.post<BaseTodoListType<{item:TaskType}>>(`/${todolistId}/tasks`,{title})
    },
    deleteTask(todolistId:string, taskId:string) {
        return instance.delete<BaseTodoListType>(`/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId:string,taskId:string, payload:TaskType) {
        return instance.put<BaseTodoListType<{item:TaskType}>>(`/${todolistId}/tasks/${taskId}`,payload)
    }

}


type TodoType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type TaskType = {
    addedDate?: string
    deadline: Date | null
    description: string | null
    id?: string
    order?: number
    priority: number
    startDate: Date | null
    status: number
    title: string
    todoListId?: string
    completed?:boolean
}

type BaseTodoListType<T={}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}

