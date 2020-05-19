import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect, Route, Switch, BrowserRouter} from 'react-router-dom';
import {Backdrop, CircularProgress} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import LoginPage from '../components/auth/LoginPage';
import PrivateRoutes from './PrivateRoutes';
import CreateAccount from "../components/auth/CreateAccount";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {refresh} from "../actions/loginAction";
import SessionExpired from "../components/auth/SessionExpired";
import ResetPassPage from "../components/auth/ResetPassPage";

const RestrictedRoute = ({user, ...rest}) => {
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
            <Snackbar open={showSnackBar} autoHideDuration={10000} onClose={() => {}}> // TODO:
                <Alert onClose={() => {}} severity={snackBarSeverity}>
                    {snackBarMessage}
                </Alert>
            </Snackbar>
            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <Switch>
                <Route path='/login' component={LoginPage}/>
                <Route path='/create-account' component={CreateAccount}/>
                <Route path='/session-expired' component={SessionExpired}/>
                <Route path='/reset-password' component={ResetPassPage}/>
                <Route exact path='/' render={() => <Redirect to='home'/>}/>
                <RestrictedRoute path='/home' /*component={PrivateRoutes}*/ history={history} user={user}/>
            </Switch>
        </BrowserRouter>
    );
};

export default connect(store => ({
    user: store.login.user,
    isLoading: store.login.isLoading || store.users.isLoading,
}))(Routes);