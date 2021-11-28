import React, {ChangeEvent, KeyboardEvent} from 'react';

type propsType = {
    title: string
    setTitle: (title: string) => void
    addTask: (title: string) => void
}

export const Input = ({title, setTitle, addTask, ...props}: propsType) => {

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask(title)
            setTitle('')
        }
    }
        return (
            <div>
                <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
            </div>
        )
    }
