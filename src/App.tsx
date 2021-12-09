import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type changePropsType = 'all' | 'active' | 'completed'

function App() {
    let [tasks, setTasks] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false}
    ])


    const removeTask = (tId: number) => {
        tasks = tasks.filter(f => f.id !== tId)
        setTasks(tasks)
    }

    let [filter, setFilter] = useState('all')
    let taskForTodolist = tasks
    if (filter === 'completed') {
        taskForTodolist = tasks.filter(f => f.isDone)
    }
    if (filter === 'active') {
        taskForTodolist = tasks.filter(f => !f.isDone)
    }
    const changeFilter = (value: changePropsType) => {
        setFilter(value)
    }
    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={taskForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
