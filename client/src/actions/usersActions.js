import httpClient from '../utils/httpClient';
import {fetchUsersActionTypes} from './actionTypes';
import {encrypt} from "../utils/rsa";
import * as NotificationsActions from "./notificationsActions";

export const beginLoading = () => ({type: fetchUsersActionTypes.USERS_BEGIN_LOADING});
export const endLoading = () => ({type: fetchUsersActionTypes.USERS_END_LOADING});

export const fetchUsers = () => async dispatch => {
    dispatch(beginLoading());
    try {
        const res = await httpClient.get('/customer/all');
        dispatch({type: fetchUsersActionTypes.FETCH_USERS, users: res.data.users});
        console.info(res);
    } catch (err) {
        dispatch(NotificationsActions.notifyError('An error occurred while trying to fetch the users.'))
        console.error(err);
    } finally {
        dispatch(endLoading());
    }
};

export const addUser = (user) => async dispatch => {
    dispatch(beginLoading());
    try {
        const {email, firstName, lastName} = user;
        const requestData = {
            ...user,
            username: email,
            password: encrypt('1234'), // TODO: send email
            address: email
        };
        const res = await httpClient.post('/customer/add', requestData);
        dispatch(NotificationsActions.notifySuccess(`User ${firstName} ${lastName} added successfully.`));
        console.info(res);
        dispatch(fetchUsers())
    } catch (err) {
        if (err.response && err.response.status === 400) {
            dispatch(NotificationsActions.notifyError('User with the given username or ID is already exist'));
        } else {
            dispatch(NotificationsActions.notifyError('An error occurred while trying to add the user.'))
        }
        dispatch(endLoading())
        console.error(err);
    }
};

export const updateUser = (user) => async dispatch => {
    dispatch(beginLoading());
    const {email, firstName, lastName} = user;
    const requestData = {
        ...user,
        username: email,
        address: email

    };
    try {
        const res = await httpClient.post('/customer/update', requestData);
        dispatch(NotificationsActions.notifySuccess(`User ${firstName} ${lastName} updated successfully.`));
        console.info(res);
        dispatch(fetchUsers())
    } catch (err) {
        dispatch(NotificationsActions.notifyError('An error occurred while trying to update the user.'))
        dispatch(endLoading())
        console.error(err);
    }
};

export const deleteUser = (userId) => async dispatch => {
    dispatch(beginLoading());
    try {
        const res = await httpClient.delete(`customer/remove/${userId}`);
        dispatch(NotificationsActions.notifyWarning(`User removed from customers list.`));
        console.info(res);
        dispatch(fetchUsers())
    } catch (err) {
        dispatch(NotificationsActions.notifyError('An error occurred while trying to delete the user.'))
        dispatch(endLoading())
        console.error(err);
    }
};