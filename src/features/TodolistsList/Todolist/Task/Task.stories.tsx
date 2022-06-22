import React from 'react'
import {Task} from './Task'
import {TaskPriorities, TaskStatuses} from '../../../../api/todolists-api'
import {ReduxStoreProviderDecorator} from '../../../../stories/decorators/ReduxStoreProviderDecorator';

export default {
    title: 'Task Stories',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
}

export const TaskBaseExample = () => {
    return (
        <div>
            <Task
                task={{
                    id: '1', status: TaskStatuses.Completed, title: 'CSS', todoListId: 'todolistId1', description: '',
                    startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
                }}
                todolistId={'todolistId1'}
            />
            <Task
                task={{
                    id: '2', status: TaskStatuses.New, title: 'JS', todoListId: 'todolistId1', description: '',
                    startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
                }}
                todolistId={'todolistId2'}
            />
        </div>)
}
