import React, {ChangeEvent, useCallback} from 'react';
import {TaskType} from '../Todolist';
import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from '../EditableSpan';
import {Delete} from '@material-ui/icons';

export type TaskPropsType = {
    todolistId: string
    task: TaskType
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Task = React.memo(({
                                    task,
                                    removeTask,
                                    todolistId,
                                    changeTaskStatus,
                                    changeTaskTitle,
                                    ...props
                                }: TaskPropsType) => {
    console.log('Task')
    const onClickHandler = useCallback(() => removeTask(task.id, todolistId),[removeTask,task.id, todolistId])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(task.id, newIsDoneValue, todolistId);
    },[changeTaskStatus,task.id, todolistId])

    const onTitleChangeHandler  = useCallback((newValue: string) => {
        changeTaskTitle(task.id, newValue, todolistId);
    },[changeTaskTitle,task.id,todolistId])

    return <div key={task.id} className={task.isDone ? 'is-done' : ''}>
        <Checkbox
            checked={task.isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})