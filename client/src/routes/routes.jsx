import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect, Route, Switch, BrowserRouter} from 'react-router-dom';
import {Backdrop, CircularProgress} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import LoginPage from '../components/auth/LoginPage';
import PrivateRoutes from './PrivateRoutes';
import CreateAccount from "../components/auth/CreateAccount";
import {refresh} from "../actions/loginActions";
import SessionExpired from "../components/auth/SessionExpired";
import ResetPassPage from "../components/auth/ResetPassPage";
import {NotificationContainer} from "react-notifications";
import '../../../client/node_modules/react-notifications/lib/notifications.css';

const RestrictedRoute = ({...rest}) => {
   // const [allow, setAllow] = useState(!!user);

    // useEffect(() => {
    //     setAllow(!!user);
    // }, [user]);

    // return (
    //     localStorage.getItem('user') ? <Route {...rest} component={PrivateRoutes}/>
    //     : <Route {...rest} render={props => (
    //             <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    //     )} />
    // );

    return (
        <Route {...rest} render={props => (
            localStorage.getItem('user') ? <PrivateRoutes {...props} />
                : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
        )}/>
    );
};

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const Routes = ({dispatch, history, user, isLoading, showSnackBar, snackBarSeverity, snackBarMessage}) => {
    const classes = useStyles();

    // useEffect(() => {  TODO:
    //     async function fetchUser() {
    //         await dispatch(refresh());
    //         history.push(history.location.pathname)
    //     }
    //     fetchUser();
    // }, []);

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
                <RestrictedRoute path='/home' /*component={PrivateRoutes}*/ history={history} user={user}/>
            </Switch>
        </BrowserRouter>
    );
};

export default connect(store => ({
    user: store.login.user,
    isLoading: store.login.isLoading || store.users.isLoading || store.employees.isLoading
}))(Routes);