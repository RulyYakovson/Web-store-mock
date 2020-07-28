import httpClient from '../utils/httpClient';
import {paymentActionTypes} from './actionTypes';
import * as NotificationsActions from "./notificationsActions";

export const beginLoading = () => ({type: paymentActionTypes.PAYMENT_BEGIN_LOADING});
export const endLoading = () => ({type: paymentActionTypes.PAYMENT_END_LOADING});

export const sendPayment = (user, shipment, payment) => async dispatch => {
    dispatch(beginLoading());
    try {
        const res = await httpClient.post('/orders', {user, shipment, payment});
        localStorage.removeItem('product-list');
        dispatch({type: paymentActionTypes.GET_PAYMENT_SUCCESS});
        console.info(res);
    } catch (err) {
        dispatch({type: paymentActionTypes.GET_PAYMENT_FAILED})
        console.error(err);
    } finally {
        dispatch(endLoading());
    }
};

export const fetchOrders = () => async dispatch => {
    dispatch(beginLoading());
    try {
        const res = await httpClient.get('/orders');
        dispatch({type: paymentActionTypes.FETCH_PAYMENTS, orders: res.data.orders});
        console.info(res);
    } catch (err) {
        dispatch(NotificationsActions.notifyError('An error occurred while trying to fetch the orders.'))
        console.error(err);
    } finally {
        dispatch(endLoading());
    }
};
