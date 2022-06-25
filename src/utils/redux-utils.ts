import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {ActionCreatorsMapObject} from '@reduxjs/toolkit';
import {useMemo} from 'react';
import {bindActionCreators} from 'redux';
import {AppDispatch, AppRootStateType} from './types';

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export const useActions = <T extends ActionCreatorsMapObject<any>>(actions: T) => {
    const dispatch = useDispatch()

    return useMemo(() => {
        return bindActionCreators(actions, dispatch)

    }, [actions, dispatch])
}