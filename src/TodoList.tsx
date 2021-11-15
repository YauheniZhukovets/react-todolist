import React from 'react';
import {filterType} from './App';

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask:(mId:number)=>void
    setFilter:(value: filterType) =>void
}

export function Todolist(props: PropsType) {
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {props.tasks.map(m => {
                    return (
                        <li key={m.id}>
                            <button onClick={()=> props.removeTask(m.id)}>X</button>
                            <input type="checkbox" checked={m.isDone}/>
                            <span>{m.title}</span></li>
                    )
                }
            )}
        </ul>
        <div>
            <button onClick={()=> props.setFilter('All')}>All</button>
            <button onClick={()=> props.setFilter('Active')}>Active</button>
            <button onClick={()=> props.setFilter('Completed')}>Completed</button>
        </div>
    </div>
}
