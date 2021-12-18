import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from './AddItemForm';

// CRUD
// Create
// Read
// Update
// Delete

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all"|"active"|"completed"
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    //BLL:
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const[todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"},
    ])
    const[tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "REACT", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "MILK", isDone: true},
            {id: v1(), title: "BEER", isDone: true},
            {id: v1(), title: "FISH", isDone: false},
        ]
    })
    //tasks:
    const removeTask = (taskID: string, todoListID: string) => {
        const copyState = {...tasks}
        copyState[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks(copyState)
    }
    const addTask = (newTaskTitle: string, todoListID: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: newTaskTitle,
            isDone: false
        }
        const copyState = {...tasks}
        copyState[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks(copyState)
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        const copyState = {...tasks}
        copyState[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, isDone}: t)
        setTasks(copyState)
    }
    const changeTaskTitle = (taskID: string, title:string, todoListID: string) => {
        const copyState = {...tasks}
        copyState[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, title: title}: t)
        setTasks(copyState)
    }
    //todoLists:
    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
    }
    const addTodoList = (title:string) => {
        const newTodo: TodoListType = {
          id: v1(),
          title: title,
          filter: "all"
      }
      setTodoLists([newTodo,...todoLists])
      setTasks({...tasks, [newTodo.id]: []})
    }
    const changeFilter = (filter: FilterValuesType, todoListID: string) => {
        const updatedTodoLists = todoLists.map(tl => tl.id === todoListID ? {...tl, filter} : tl)
        setTodoLists(updatedTodoLists)
    }
    const changeTodoListTitle = (title: string, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, title: title} : tl))

    }

    const getTasksForRender = (todoList: TodoListType) => {
        switch (todoList.filter) {
            case "active":
                return tasks[todoList.id].filter(t => !t.isDone)
            case "completed":
                return tasks[todoList.id].filter(t => t.isDone)
            default:
                return tasks[todoList.id]
        }
    }

    const todoListComponents = todoLists.map(tl => {
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

    //UI:
    return (
        <div className="App">
            {/*<button onClick={addTodo}>Add</button>*/}
            <AddItemForm addItem={addTodoList}/>
            { todoListComponents }
        </div>
    );
}

export default App;
