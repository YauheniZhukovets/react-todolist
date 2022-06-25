import React, {ChangeEvent, useCallback} from 'react'
import {Checkbox, IconButton} from '@material-ui/core'
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan'
import {Delete} from '@material-ui/icons'
import {tasksActions} from '../../index';
import {useActions} from '../../../../utils/redux-utils';
import {TaskStatuses, TaskType} from '../../../../api/types';

type TaskPropsType = {
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const {removeTaskTC, updateTaskTC} = useActions(tasksActions)

    const onClickHandler = useCallback(() => removeTaskTC({taskId: props.task.id, todolistId: props.todolistId}),
        [props.task.id, props.todolistId, removeTaskTC]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        updateTaskTC({
            taskId: props.task.id,
            model: {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New},
            todolistId: props.todolistId
        })
    }, [props.task.id, props.todolistId, updateTaskTC]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        updateTaskTC({taskId: props.task.id, model: {title: newValue}, todolistId: props.todolistId})
    }, [props.task.id, props.todolistId, updateTaskTC]);

    return <div style={{position: 'relative'}} key={props.task.id}
                className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox
            checked={props.task.status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
        <IconButton  size={'small'} onClick={onClickHandler} style={{position: 'absolute', top: '5px', right: '5px'}}>
            <Delete fontSize={'small'}/>
        </IconButton>
    </div>
})
