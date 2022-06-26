import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './reducers';

export const store = configureStore({
    reducer: rootReducer
})

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
}



