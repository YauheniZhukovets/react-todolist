import React from 'react';

type propsButtonType = {
    name:string
    callback:()=>void
}

export const Button = (props:propsButtonType) =>{
    const onClickButtonHandler = () =>{
    props.callback()
    }
    return(
        <button onClick={onClickButtonHandler}>{props.name}</button>
    )
}
