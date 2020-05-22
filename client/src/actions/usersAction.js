import httpClient from '../utils/httpClient';
import {fetchUsersActionTypes} from './actionTypes';
import {encrypt} from "../utils/rsa";

export const beginLoading = () => ({type: fetchUsersActionTypes.USERS_BEGIN_LOADING});
export const endLoading = () => ({type: fetchUsersActionTypes.USERS_END_LOADING});

export const fetchUsers = () => async dispatch => {
    dispatch(beginLoading());
    try {
        const res = await httpClient.get('/customer/all');
        dispatch({type: fetchUsersActionTypes.FETCH_USERS, users: res.data.users});
        console.info(res);
    } catch (err) {
        console.error(err);
    } finally {
        dispatch(endLoading());
    }
};

export const addUser = (user) => async dispatch => {
    dispatch(beginLoading());
    try {
        const {email} = user;
        const requestData = {
            ...user,
            username: email,
            password: encrypt('1234'), // TODO: send email
            address: email
        };
        const res = await httpClient.post('/customer/add', requestData);
        console.info(res);
        dispatch(fetchUsers())
    } catch (err) {
        dispatch(endLoading())
        console.error(err);
    }
};

export const updateUser = (user) => async dispatch => {
    dispatch(beginLoading());
    const {email} = user;
    const requestData = {
        ...user,
        username: email,
        address: email
    };
    try {
        const res = await httpClient.post('/customer/update', requestData);
        console.info(res);
        dispatch(fetchUsers())
    } catch (err) {
        dispatch(endLoading())
        console.error(err);
    }
};

export const deleteUser = (userId) => async dispatch => {
    dispatch(beginLoading());
    try {
        const res = await httpClient.delete(`customer/remove/${userId}`);
        console.info(res);
        dispatch(fetchUsers())
    } catch (err) {
        dispatch(endLoading())
        console.error(err);
    }
};