import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (filter: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    filter: FilterValuesType
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

function TodoList(props: PropsType) {

    const addTask = (title: string) => props.addTask(title, props.id)
    const setAllFilterValue = () => props.changeFilter('all', props.id)
    const setActiveFilterValue = () => props.changeFilter('active', props.id)
    const setCompletedFilterValue = () => props.changeFilter('completed', props.id)
    const getBtnClass = (filter: FilterValuesType) => props.filter === filter ? 'active' : '';
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.id)
    }

    const tasksJSX = props.tasks.map(task => {
        const getClasses = () => task.isDone ? 'is-done' : '';
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)

        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(task.id, title, props.id)
        }



        const removeTask = () => props.removeTask(task.id, props.id)

        return (
            <li key={task.id} className={getClasses()}>
                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={changeStatus}
                />
                <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                <button onClick={removeTask}>x</button>
            </li>
        )
    })

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>

                <button onClick={() => props.removeTodoList(props.id)}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button
                    className={getBtnClass('all')}
                    onClick={setAllFilterValue}>All
                </button>
                <button
                    className={getBtnClass('active')}
                    onClick={setActiveFilterValue}>Active
                </button>
                <button
                    className={getBtnClass('completed')}
                    onClick={setCompletedFilterValue}>Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList;