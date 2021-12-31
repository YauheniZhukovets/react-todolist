import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";
//rsc
type EditableSpanPropsType = {
    title: string
    spanClass?: string
    changeTitle: (newTitle: string) => void
}
const EditableSpan = (props: EditableSpanPropsType) => {
    const [title, setTitle] = useState<string>(props.title)
    const [editMode, setEditMode] = useState<boolean>(false)
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (
        editMode
            ? <TextField
                value={title}
                autoFocus={true}
                onBlur={offEditMode}
                onChange={changeTitle}
                fullWidth
            />
            : <span
                style={{fontWeight: "bold"}}
                className={props.spanClass}
                onDoubleClick={onEditMode}
            >
                {props.title}
            </span>
    );
};

export default EditableSpan;
