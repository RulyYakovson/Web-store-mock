import httpclient from '../utils/httpClient';
import {loginActionTypes} from './actionTypes';
import {encrypt} from "../utils/rsa";

export const beginLoading = () => ({type: loginActionTypes.LOGIN_BEGIN_LOADING});
export const endLoading = () => ({type: loginActionTypes.LOGIN_END_LOADING});

export const login = (email, password) => async dispatch => {
    dispatch(beginLoading());
    try {
        const requestData = {
            username: email,
            password: encrypt(password)
        };
        const res = await httpclient.post('/login', requestData);
        dispatch({type: loginActionTypes.AUTH_FINISH, user: res.data.user});
        localStorage.setItem('user', JSON.stringify(res.data.user)); // TODO:
        console.info(res);
    } catch (err) {
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
        history.push('/login');
        console.info(res);
    } catch (err) {
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
        console.error(err);
    } finally {
        dispatch(endLoading());
    }
};

export const createAccount = (user) => async dispatch => {
    dispatch(beginLoading());
    const { email, password } = user;
    try {
        const requestData = {
            ...user,
            username: email,
            password: encrypt(password),
            address: email
        };
        const res = await httpclient.post('/customer/add', requestData); // TODO: change path
        // TODO: get the created user
        dispatch({type: loginActionTypes.AUTH_FINISH, user: res.data.user});
        localStorage.setItem('user', JSON.stringify(res.data.user)); // TODO:
        console.info(res);
    } catch (err) {
        console.error(err);
    } finally {
        dispatch(endLoading());
    }
};