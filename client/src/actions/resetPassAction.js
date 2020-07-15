import httpClient from '../utils/httpClient';
import {isLoadingActionTypes} from './actionTypes';
import {encrypt} from "../utils/rsa";
import {login} from "./loginActions";
import * as NotificationsActions from "./notificationsActions";

export const beginLoading = () => ({type: isLoadingActionTypes.BEGIN_LOADING});
export const endLoading = () => ({type: isLoadingActionTypes.END_LOADING});

export const resetPass = (email) => async dispatch => {
    dispatch(beginLoading());
    try {
        const requestData = {
            email: email,
        };
        const res = await httpClient.post('/reset_pass', requestData);
        dispatch(NotificationsActions.notifyInfo('Reset token has been sent to your email.'));
        console.info(res);
        return true;
    } catch (err) {
        if (err.response && err.response.status === 400) {
            dispatch(NotificationsActions.notifyError('Email address is not registered.'));
        } else {
            dispatch(NotificationsActions.notifyError('An error occurred while trying to reset the password.'))
        }
        console.error(err);
        return false;
    } finally {
        dispatch(endLoading());
    }
};

export const changePass = (token, email, password) => async dispatch => {
    dispatch(beginLoading());
    const requestData = {
        token: token,
        username: email,
        password: encrypt(password),
    };
    try {
        const res = await httpClient.post('/employee/new_pass', requestData);
        console.info(res);
        await dispatch(login(email, password));
        dispatch(NotificationsActions.notifySuccess('Password has been changed successfully.'));
    } catch (err) {
        try {
            const res = await httpClient.post('/customer/new_pass', requestData);
            console.info(res);
            await dispatch(login(email, password));  // TODO: login success but not moved to the home page
            dispatch(NotificationsActions.notifySuccess('Password has been changed successfully.'));
        } catch {
            if (err.response && err.response.status === 400) {
                dispatch(NotificationsActions.notifyError(`${email} not found.`))
            } else if (err.response && err.response.status === 401) {
                dispatch(NotificationsActions.notifyError('Token has incorrect or expired.'))
            } else {
                dispatch(NotificationsActions.notifyError('An error occurred while trying to update the password.'))
            }
            console.error(err);
        }
    } finally {
        dispatch(endLoading());
    }
};