import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '6b986b64-b31b-4013-a97c-d743f4ca9a13'
    }
})


export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('/todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<BaseResponseType<{ item: TodolistType }>, { title: string }>('/todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<BaseResponseType>(`/todo-lists/${todolistId}`)
    },
    updateTodolist(p: { todolistId: string, title: string }) {
        return instance.put<BaseResponseType, { title: string }>(`/todo-lists/${p.todolistId}`, {title: p.title})

    }
}

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type BaseResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}
