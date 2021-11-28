import React from 'react'

type propsType = {
    name:string
    callBack:() => void
}

export const NewButton = ({name,callBack,...props}:propsType) =>{
    const onClickHandler = () => {
        callBack()
    }
    return(
        <button onClick={onClickHandler}>{name}</button>
    )
}