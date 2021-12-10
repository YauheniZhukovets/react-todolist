import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import styles from './Todolist.module.css'

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatusHandler: (id: string, isDone: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<boolean>(false)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title);
            setError(false)
            setTitle('');
        } else {
            setError(true)
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter('all');
    const onActiveClickHandler = () => props.changeFilter('active');
    const onCompletedClickHandler = () => props.changeFilter('completed');



    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} className={error ? styles.error : ''} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
            <button onClick={addTask}>+</button>
            {error && <div className={styles.errorMessage}>Title is require</div>}

        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)
                    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let status = e.currentTarget.checked
                        props.changeStatusHandler(t.id, status)
                    }

                    return <li key={t.id} className={t.isDone ? styles.isDone : ''}>
                        <input type="checkbox" onChange={changeStatusHandler} checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? styles.activeFilter: ''} onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? styles.activeFilter: ''} onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'completed' ? styles.activeFilter: ''} onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
