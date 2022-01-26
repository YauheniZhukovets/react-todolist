import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {EditableSpan} from './EditableSpan';
import {action} from '@storybook/addon-actions';

export default {
    title: 'TodoLists/EditableSpan',
    component: EditableSpan,
    args: {
        value: 'value'
    }
} as ComponentMeta<typeof EditableSpan>;


const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStory = Template.bind({});
EditableSpanStory.args = {
    onChange: action('change value')
};

