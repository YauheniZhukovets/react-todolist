import React, {useCallback, useEffect} from 'react'
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm'
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan'
import {Button, IconButton} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import {Task} from './Task/Task'
import {TaskStatuses, TaskType} from '../../../api/todolists-api'
import {TodolistDomainType} from '../todolists-reducer'
import {useActions} from '../../../app/store';
import {tasksActions, todolistsActions} from '../index';


type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    demo?: boolean
}

export const Todolist = React.memo(function ({demo = false, ...props}: PropsType) {
    console.log('Todolist called')
    const {fetchTasksTC, addTaskTC} = useActions(tasksActions)
    const {removeTodolistTC, changeTodolistTitleTC,changeTodolistFilterAC} = useActions(todolistsActions)

    useEffect(() => {
        if (demo) {
            return
        }
        fetchTasksTC(props.todolist.id)
    }, [demo, fetchTasksTC, props.todolist.id])

    const addTaskCallback = useCallback((title: string) => {
        addTaskTC({title, todolistId: props.todolist.id})
    }, [addTaskTC, props.todolist.id])

    const removeTodolist = () => {
        removeTodolistTC(props.todolist.id)
    }
    const changeTodolistTitle = useCallback((title: string) => {
        changeTodolistTitleTC({id: props.todolist.id, title})
    }, [changeTodolistTitleTC, props.todolist.id])

    const onAllClickHandler = useCallback(() => changeTodolistFilterAC({filter:'all', id:props.todolist.id}), [changeTodolistFilterAC, props.todolist.id])
    const onActiveClickHandler = useCallback(() => changeTodolistFilterAC({filter:'active', id:props.todolist.id}), [changeTodolistFilterAC, props.todolist.id])
    const onCompletedClickHandler = useCallback(() => changeTodolistFilterAC({filter:'completed', id: props.todolist.id}), [changeTodolistFilterAC, props.todolist.id])

    let tasksForTodolist = props.tasks

    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return <div>
        <h3><EditableSpan value={props.todolist.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTaskCallback} disabled={props.todolist.entityStatus === 'loading'}/>
        <div>
            {
                tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={props.todolist.id}/>)
            }
        </div>
        <div style={{paddingTop: '10px'}}>
            <Button variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'default'}
            >All
            </Button>
            <Button variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})


