import React, {useCallback, useEffect} from 'react'
import './App.css'
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {initializeAppTC} from './app-reducer'
import {Route} from 'react-router-dom'
import {Login} from '../features/Auth/Login'
import {logoutTC} from '../features/Auth/auth-reducer'
import {authSelectors} from '../features/Auth';
import {selectIsInitialized, selectStatus} from './selectors';
import {useAppDispatch, useAppSelector} from './store';

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useAppSelector(selectStatus)
    const isInitialized = useAppSelector(selectIsInitialized)
    const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!demo) {
            dispatch(initializeAppTC())
        }
    }, [])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Route exact path={'/'} render={() => <TodolistsList demo={demo}/>}/>
                <Route path={'/login'} render={() => <Login/>}/>
            </Container>
        </div>
    )
}

export default App
