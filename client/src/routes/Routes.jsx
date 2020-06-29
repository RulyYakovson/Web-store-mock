import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route, Switch, BrowserRouter} from 'react-router-dom';
import {Backdrop, CircularProgress} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import LoginPage from '../components/auth/LoginPage';
import CreateAccount from "../components/auth/CreateAccount";
import SessionExpired from "../components/auth/SessionExpired";
import ResetPassPage from "../components/auth/ResetPassPage";
import {NotificationContainer} from "react-notifications";
import '../../../client/node_modules/react-notifications/lib/notifications.css';
import Cash from "../components/cash/Cash";
import Dashboard from "../components/dashboard/Dashboard";
import Root from '../chat/Root';

const RestrictedRoute = ({Component, dispatch, ...rest}) => {
    // const auth = store.getState().login;
    // const allow = get(auth, 'user');     TODO.....

    return (
        <Route {...rest} render={props => (
            localStorage.getItem('user') ? <Component {...props} />
                : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
        )}/>
    );
}

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const Routes = ({dispatch, history, isLoading}) => {
    const classes = useStyles();

    return (
        <BrowserRouter history={history}>
            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <NotificationContainer/>
            <Switch>
                <Route path='/login' component={LoginPage}/>
                <Route path='/create-account' component={CreateAccount}/>
                <Route exact path='/session-expired' component={SessionExpired}/>
                <Route exact path='/reset-password' component={ResetPassPage}/>

                <Route exact path='/' render={() => <Redirect to='home'/>}/>
                <RestrictedRoute path='/home' dispatch={dispatch} Component={Dashboard}/>
                <RestrictedRoute path='/cash' dispatch={dispatch} Component={Cash}/>
                {/*<RestrictedRoute path='/chat' Component={Root}/>*/}
            </Switch>
        </BrowserRouter>
    );
};

export default connect(store => ({
    user: store.login.user,
    isLoading: store.login.isLoading
}))(Routes);