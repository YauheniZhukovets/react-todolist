import React, {useReducer} from 'react';
import './App.css';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';
import TodoList from './TodoList';
import {
    addEmptyArrayAC,
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTasksAC,
    TasksReducer
} from './reducer/TasksReducer';
import {
    addTodoListAC,
    changeFilterAC,
    changeTodoListTitleAC,
    todoListAC,
    TodoListReducer
} from './reducer/TodoListReducer';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    //BLL:
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    //states
    const [todoLists, todoListsDispatch] = useReducer(TodoListReducer, [
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, tasksDispatch] = useReducer(TasksReducer, {
        [todoListID_1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'REACT', isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: 'MILK', isDone: true},
            {id: v1(), title: 'BEER', isDone: true},
            {id: v1(), title: 'FISH', isDone: false},
        ]
    })

    //tasks:
    const removeTask = (taskID: string, todoListID: string) => {
        tasksDispatch(removeTasksAC(taskID, todoListID))
        // const copyState = {...tasks}
        // copyState[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        // setTasks(copyState)
    }
    const addTask = (newTaskTitle: string, todoListID: string) => {
        tasksDispatch(addTaskAC(newTaskTitle, todoListID))
        // const newTask: TaskType = {
        //     id: v1(),
        //     title: newTaskTitle,
        //     isDone: false
        // }
        // const copyState = {...tasks}
        // copyState[todoListID] = [newTask, ...tasks[todoListID]]
        // setTasks(copyState)
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        tasksDispatch(changeTaskStatusAC(taskID, isDone, todoListID))
        // const copyState = {...tasks}
        // copyState[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, isDone} : t)
        // setTasks(copyState)
    }
    const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
        tasksDispatch(changeTaskTitleAC(taskID, title, todoListID))
        // const copyState = {...tasks}
        // copyState[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, title} : t)
        // setTasks(copyState)
    }
    //todoLists:
    const removeTodoList = (todoListID: string) => {
        todoListsDispatch(todoListAC(todoListID))
        // setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
    }
    const addTodoList = (title: string) => {
        const id = v1()
         todoListsDispatch(addTodoListAC(title,id))
         tasksDispatch(addEmptyArrayAC(id))

        // const newTodo: TodoListType = {
        //     id: v1(),
        //     title: title,
        //     filter: 'all'
        // }
        // setTodoLists([...todoLists, newTodo])
        // setTasks({...tasks, [newTodo.id]: []})
     }
    const changeFilter = (filter: FilterValuesType, todoListID: string) => {
        todoListsDispatch(changeFilterAC(filter,todoListID))
        // const updatedTodoLists = todoLists.map(tl => tl.id === todoListID ? {...tl, filter} : tl)
        // setTodoLists(updatedTodoLists)
    }
    const changeTodoListTitle = (title: string, todoListID: string) => {
        todoListsDispatch(changeTodoListTitleAC(title,todoListID))
        // const updatedTodoLists = todoLists.map(tl => tl.id === todoListID ? {...tl, title} : tl)
        // setTodoLists(updatedTodoLists)
    }

    //UI:
    const getTasksForRender = (todoList: TodoListType) => {
        switch (todoList.filter) {
            case 'active':
                return tasks[todoList.id].filter(t => !t.isDone)
            case 'completed':
                return tasks[todoList.id].filter(t => t.isDone)
            default:
                return tasks[todoList.id]
        }
    }
     const todoListComponents = todoLists.map((tl: TodoListType) => {
        const taskForRender = getTasksForRender(tl)
        return (
            <TodoList
                key={tl.id}
                id={tl.id}
                title={tl.title}
                filter={tl.filter}
                tasks={taskForRender}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
                changeTaskStatus={changeTaskStatus}
                removeTodoList={removeTodoList}
                changeTaskTitle={changeTaskTitle}
                changeTodoListTitle={changeTodoListTitle}
            />
        )
    })
    return (
        <div className="App">
            {/*<button onClick={addTodo}>Add</button>*/}
            <AddItemForm addItem={addTodoList}/>
            {todoListComponents}
        </div>
    );
}

export default App;
