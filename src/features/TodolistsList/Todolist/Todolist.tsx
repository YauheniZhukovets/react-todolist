import React, {useCallback, useEffect} from 'react'
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm'
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan'
import {Button, IconButton, Paper, PropTypes} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import {Task} from './Task/Task'
import {TaskStatuses, TaskType} from '../../../api/todolists-api'
import {FilterValuesType, TodolistDomainType} from '../todolists-reducer'
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
    const {removeTodolistTC, changeTodolistTitleTC, changeTodolistFilterAC} = useActions(todolistsActions)

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

    const onFilterButtonClickHandler = useCallback((filter: FilterValuesType) => {
        changeTodolistFilterAC({filter: filter, id: props.todolist.id})
    }, [changeTodolistFilterAC, props.todolist.id])

    let tasksForTodolist = props.tasks

    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }


    const renderFilterButton = (buttonFilter: FilterValuesType, color: PropTypes.Color, text: string) => {
        return <Button variant={props.todolist.filter === buttonFilter ? 'outlined' : 'text'}
                       onClick={() => onFilterButtonClickHandler(buttonFilter)}
                       color={color}
        >{text}
        </Button>
    }

    return <Paper style={{position: 'relative', padding: '10px'}}>
        <IconButton onClick={removeTodolist}
                    disabled={props.todolist.entityStatus === 'loading'}
                    style={{position: 'absolute', right: '5px', top: '5px'}}
        >
            <Delete/>
        </IconButton>
        <h3><EditableSpan value={props.todolist.title} onChange={changeTodolistTitle}/>
        </h3>
        <AddItemForm addItem={addTaskCallback} disabled={props.todolist.entityStatus === 'loading'}/>
        <div>
            {
                tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={props.todolist.id}/>)
            }
            {
                !tasksForTodolist.length && <div style={{padding: '10px', color: 'grey'}}>Create your first task!</div>
            }
        </div>
        <div style={{paddingTop: '10px'}}>
            {renderFilterButton('all', 'default', 'All')}
            {renderFilterButton('active', 'primary', 'Active')}
            {renderFilterButton('completed', 'secondary', 'Completed')}
        </div>
    </Paper>
})


