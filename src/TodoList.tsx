import React from 'react';
import {changePropsType} from './App';

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask:(tId:number)=>void
    changeFilter:(value:changePropsType)=>void
}

export function Todolist(props: PropsType) {
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {props.tasks.map(m => <li key={m.id}>
                <input type="checkbox" checked={m.isDone}/>
                <span>{m.title}</span>
                <button onClick={()=>{props.removeTask(m.id)}}>x</button>
            </li>)}

        </ul>
        <div>
            <button onClick={()=>{props.changeFilter("all")}}>All</button>
            <button onClick={()=>{props.changeFilter("active")}}>Active</button>
            <button onClick={()=>{props.changeFilter("completed")}}>Completed</button>
        </div>
    </div>
}
