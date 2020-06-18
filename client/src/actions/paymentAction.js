import httpClient from '../utils/httpClient';
import {paymentActionTypes} from './actionTypes';
import * as NotificationsActions from "./notificationsActions";

export const beginLoading = () => ({type: paymentActionTypes.PAYMENT_BEGIN_LOADING});
export const endLoading = () => ({type: paymentActionTypes.PAYMENT_END_LOADING});

export const sendPayment = (user, payment) => async dispatch => {
    dispatch(beginLoading());
    try {
        const res = await httpClient.post('/payment', {user, payment});
        dispatch({type: paymentActionTypes.GET_PAYMENT_SUCCESS});
        console.info(res);
    } catch (err) {
        dispatch({type: paymentActionTypes.GET_PAYMENT_FAILED})
        console.error(err);
    } finally {
        dispatch(endLoading());
    }
};
