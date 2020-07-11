import httpclient from '../utils/httpClient';
import * as NotificationsActions from './notificationsActions';
import {loginActionTypes} from './actionTypes';
import {encrypt} from "../utils/rsa";

export const beginLoading = () => ({type: loginActionTypes.LOGIN_BEGIN_LOADING});
export const endLoading = () => ({type: loginActionTypes.LOGIN_END_LOADING});
export const updateBeginLoading = () => ({type: loginActionTypes.UPDATE_BEGIN_LOADING});
export const updateEndLoading = () => ({type: loginActionTypes.UPDATE_END_LOADING});

export const login = (email, password, rememberMe) => async dispatch => {
    dispatch(beginLoading());
    try {
        const requestData = {
            username: email,
            rememberMe: rememberMe,
            password: encrypt(password)
        };
        const res = await httpclient.post('/login', requestData);
        dispatch({type: loginActionTypes.AUTH_FINISH, user: res.data.user});
        localStorage.setItem('user', JSON.stringify(res.data.user)); // TODO:
        dispatch(NotificationsActions.notifySuccess('Logged in successfully !!'))
        console.info(res);
    } catch (err) {
        if (err.response && err.response.status === 401) {
            dispatch(NotificationsActions.notifyError('Username or password incorrect. Please try again.'))
        } else {
            dispatch(NotificationsActions.notifyError('An error occurred during the login request.'))
        }
        console.error(err);
    } finally {
        dispatch(endLoading());
    }
};

export const logOut = (history) => async dispatch => {
    dispatch(beginLoading());
    try {
        const res = await httpclient.get('/logout');
        // await removeUserLocal(history);
        dispatch({type: loginActionTypes.AUTH_FINISH, user: null});
        localStorage.removeItem('user');
        dispatch(NotificationsActions.notifyWarning('You have logged out of your account.'))
        history.push('/login');
        console.info(res);
    } catch (err) {
        dispatch(NotificationsActions.notifyError('An error occurred during the logout request.'))
        console.error(err);
    } finally {
        dispatch(endLoading());
    }
};

// export const removeUserLocal = (history) => async dispatch => {
//     dispatch({type: loginActionTypes.AUTH_FINISH, user: null});
//     localStorage.removeItem('user');
//     history.replace('/session-expired'); // TODO: not working...
// }

export const refresh = () => async dispatch => {
    dispatch(beginLoading());
    try {
        const res = await httpclient.get('/user');
        dispatch({type: loginActionTypes.AUTH_FINISH, user: res.data.user});
        localStorage.setItem('user', JSON.stringify(res.data.user));
        console.info(res);
    } catch (err) {
        dispatch(NotificationsActions.notifyError('An error occurred during the fetch user details.'))
        console.error(err);
    } finally {
        dispatch(endLoading());
    }
};

export const createAccount = (user) => async dispatch => {
    dispatch(beginLoading());
    const {email, password} = user;
    try {
        const requestData = {
            ...user,
            username: email,
            password: encrypt(password),
            address: email
        };
        const res = await httpclient.post('/customer/add', requestData);
        dispatch({type: loginActionTypes.AUTH_FINISH, user: res.data.user});
        dispatch(NotificationsActions.notifySuccess('New account created successfully !!'))
        localStorage.setItem('user', JSON.stringify(res.data.user)); // TODO: login !!!
        console.info(res);
    } catch (err) {
        dispatch(NotificationsActions.notifyError('An error occurred while trying to create account.'))
        console.error(err);
    } finally {
        dispatch(endLoading());
    }
};

export const updateAccount = (user) => async dispatch => {
    dispatch(updateBeginLoading());
    try {
        const res = await httpclient.post('/edit', user);
        dispatch({type: loginActionTypes.AUTH_FINISH, user: res.data.user});
        dispatch(NotificationsActions.notifySuccess('Profile updated successfully !!'))
        localStorage.setItem('user', JSON.stringify(res.data.user));
        console.info(res);
    } catch (err) {
        dispatch(NotificationsActions.notifyError('An error occurred while trying to update profile.'))
        console.error(err);
    } finally {
        dispatch(updateEndLoading());
    }
};