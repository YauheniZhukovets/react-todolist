import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    addTask:(title: string)=> void
}

export function Todolist(props: PropsType) {

    let [filter, setFilter] = useState<FilterValuesType>('all');

    let tasksForTodolist = props.tasks;

    if (filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
    }
    if (filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }


    let [title,setTitle] = useState('')

    const onChangeHandler= (event:ChangeEvent<HTMLInputElement>) =>{
        setTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) =>{
        if(event.key === 'Enter')
            addTaskHandler()
    }

    const addTaskHandler=()=> {
        props.addTask(title)
        setTitle('')
    }

    const tsar = (value:FilterValuesType) => {
        {changeFilter(value)}
    }

    const removeTaskHandler=(id:string)=>{
        props.removeTask(id)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
            <button onClick={addTaskHandler}>+</button>
        </div>
        <ul>
            {
                tasksForTodolist.map(t => <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={ () => { removeTaskHandler(t.id) } }>x</button>
                </li>)
            }
        </ul>
        <div>
            <button onClick={()=>tsar('all')}>All</button>
            <button onClick={()=>tsar('active')}>Active</button>
            <button onClick={()=>tsar('completed')}>Completed</button>
        </div>

    </div>
}
