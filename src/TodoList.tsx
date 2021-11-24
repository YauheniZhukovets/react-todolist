import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from './components/Button';

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
}

export function Todolist(props: PropsType) {






    const [title, setTitle] = useState('')
    console.log(title)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        // if ((event.key === 'Control')|| event.key==='Enter'){
         if (event.ctrlKey) {
            addTaskHandler()
        }
    }

    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    // const changeFilterAllHandler=()=>{
    //     props.changeFilter('all')
    // }
    //
    // const changeFilterActiveHandler=()=>{
    //     props.changeFilter('active')
    // }
    //
    // const changeFilterCompletedHandler=()=>{
    //     props.changeFilter('completed')
    // }

    // const tsarchangeFilterHandler = (value: FilterValuesType) => {
    //     props.changeFilter(value)
    // }

        const removeTaskHandler = (id: string) => {
        props.removeTask(id)
    }


    // const onClickAllHandler = () => props.changeFilter('all')
    // const onClickActiveHandler = () => props.changeFilter('active')
    // const onClickACompletedHandler = () => props.changeFilter('completed')

    const tsarFooHandler=(value:FilterValuesType)=>{
        props.changeFilter(value)

    }


return <div>
    <h3>{props.title}</h3>
    <div>
        <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
        <button onClick={addTaskHandler}>+</button>
    </div>
    <ul>
        {
            props.tasks.map(t => <li>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                {/*<button onClick={() => removeTaskHandler(t.id)}>x</button>*/}
                <Button name={'xxx'} callBack={() => removeTaskHandler(t.id)}/>
            </li>)
        }
    </ul>
    <div>
        {/*<button onClick={()=>tsarFooHandler('all')}>All</button>*/}
        {/*<button onClick={()=>tsarFooHandler('active')}>Active</button>*/}
        {/*<button onClick={()=>tsarFooHandler('completed')}>Completed</button>*/}

        <Button name={'all'} callBack={()=>tsarFooHandler('all')}/>
        <Button name={'active'} callBack={()=>tsarFooHandler('active')}/>
        <Button name={'completed'} callBack={()=>tsarFooHandler('completed')}/>

    </div>
</div>
}

