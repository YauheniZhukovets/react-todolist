import {setAppErrorAC, setAppErrorACType, setStatusAC, setStatusACType} from '../app/app-reducer';
import {ResponseType, TaskType} from '../api/todolists-api';
import {Dispatch} from 'redux';

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType ) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setStatusAC('failed'))
}

export const handleServerNetworkError = (error: string, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC(error))
    dispatch(setStatusAC('failed'))
}
type ErrorUtilsDispatchType = Dispatch<setStatusACType | setAppErrorACType>
