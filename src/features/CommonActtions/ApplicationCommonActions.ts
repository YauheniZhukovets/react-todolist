import {createAction} from '@reduxjs/toolkit';
import {RequestStatusType} from '../Application/application-reducer';

export const setAppStatus = createAction<{ status: RequestStatusType }>('application/setAppStatus')

export const setAppError = createAction<{ error: string | null }>('application/setAppError')