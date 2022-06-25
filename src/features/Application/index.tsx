import * as appSelectors from '../../app/selectors'
import {asyncActions, RequestStatusType as T1, slice as appSlice} from './application-reducer';
import {setAppError, setAppStatus} from '../CommonActtions/ApplicationCommonActions'

const appReducer = appSlice.reducer

const actions = {setAppStatus, setAppError}

const appActions = {
    ...actions,
    ...asyncActions
}

export type RequestStatusType = T1

export {
    appActions,
    appSelectors,
    appReducer,
}