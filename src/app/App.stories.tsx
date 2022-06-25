import React from 'react'
import App from './App'
import {HashRouterDecorator, ReduxStoreProviderDecorator} from '../stories/decorators/ReduxStoreProviderDecorator'

export default {
    title: 'Application Stories',
    component: App,
    decorators: [ReduxStoreProviderDecorator, HashRouterDecorator]
}

export const AppBaseExample = () => {
    return (<App demo={true}/>)
}
