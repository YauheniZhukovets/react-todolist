import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter"){
            addItem();
        }
    }


    return (
        <div>
            <TextField
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddItem}
                variant={"outlined"}
                label={"Title"}
                size={"small"}
                error={error}
                helperText={error && "Title is required!"}
            />
            <IconButton onClick={addItem} color={"primary"} size={"medium"}>
                <AddBox />
            </IconButton>
        </div>
    );
};

export default AddItemForm;