import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {useDispatch, useSelector} from 'react-redux';
import {rootReducerType} from './store/store';
import {changeFilterAC} from './reducers/FilterReducer';
import {addTaskAC, removeTaskAC} from './reducers/TasksReducer';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    // tasks: Array<TaskType>
    // removeTask: (taskId: string) => void
    // changeFilter: (value: FilterValuesType) => void
    // addTask: (title: string) => void
}

export function Todolist(props: PropsType) {
    let tasks = useSelector<rootReducerType, Array<TaskType>>(state => state.tasks)
    let filter = useSelector<rootReducerType, FilterValuesType>(state => state.filter)
    let dispatch = useDispatch();

    let [title, setTitle] = useState('')

    const addTaskClick = () => {
        dispatch(addTaskAC(title))
        setTitle('');
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskClick();
        }
    }

    function changeFilter(value: FilterValuesType) {
        // setFilter(value);
        // filterDispatch(changeFilterAC(value))
        dispatch(changeFilterAC(value))
    }

    function removeTask(id: string) {
        // let filteredTasks = tasks.filter(t => t.id != id);
        // setTasks(filteredTasks);

        // tasksDispatch(removeTaskAC(id))
        dispatch(removeTaskAC(id))
    }

    // function addTask(title: string) {
    //
    //     // let task = { id: v1(), title: title, isDone: false };
    //     // let newTasks = [task, ...tasks];
    //     // setTasks(newTasks);
    //
    //     // tasksDispatch(addTaskAC(title,))
    //     dispatch(addTaskAC(title))
    // }

    const onAllClickHandler = () => changeFilter('all');
    const onActiveClickHandler = () => changeFilter('active');
    const onCompletedClickHandler = () => changeFilter('completed');

    let tasksForTodolist = tasks;

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTaskClick}>+</button>
        </div>
        <ul>
            {
                tasksForTodolist.map(t => {

                    const onClickHandler = () => removeTask(t.id)

                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={onAllClickHandler}>All</button>
            <button onClick={onActiveClickHandler}>Active</button>
            <button onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
