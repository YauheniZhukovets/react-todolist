import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title);
            setTitle('');
        } else {
            setError('Title is required');
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div>
        <TextField
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            // className={error ? 'error' : ''}
            variant={'outlined'}
            label={'Title'}
            size={'small'}
            error={!!error}
            helperText={!!error}

        />
        <IconButton onClick={addItem} color={'primary'} size={'medium'}>
            <AddBox/>
        </IconButton>

        {error && <div className="error-message">{error}</div>}
    </div>
}
