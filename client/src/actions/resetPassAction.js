import httpClient from '../utils/httpClient';
import {isLoadingActionTypes} from './actionTypes';
import {encrypt} from "../utils/rsa";
import {login} from "./loginAction";

export const beginLoading = () => ({type: isLoadingActionTypes.BEGIN_LOADING});
export const endLoading = () => ({type: isLoadingActionTypes.END_LOADING});

export const resetPass = (email) => async dispatch => {
    dispatch(beginLoading());
    try {
        const requestData = {
            email: email,
        };
        const res = await httpClient.post('/reset_pass', requestData);
        console.info(res);
        return true;
    } catch (err) {
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
        await dispatch(login(email, password)); // TODO
    } catch (err) {
        try {
            const res = await httpClient.post('/customer/new_pass', requestData);
            console.info(res);
            await dispatch(login(email, password));  // TODO
        } catch {
            console.error(err);
        }
    } finally {
        dispatch(endLoading());
    }
};