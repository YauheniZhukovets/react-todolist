import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Task} from './Task';

export default {
    title: 'TodoLists/Task',
    component: Task,
    args: {
        changeTaskStatus: action('change status'),
        changeTaskTitle: action('change title'),
        removeTask: action('remove task'),
        todolistId: '12',
    }
} as ComponentMeta<typeof Task>;


const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});
TaskIsDoneStory.args = {
    task: {id: 'q', title: 'JS', isDone: false}
};


export const TaskIsNotDoneStory = Template.bind({});
TaskIsNotDoneStory.args = {
    task: {id: 'B', title: 'CSS', isDone: true}
}