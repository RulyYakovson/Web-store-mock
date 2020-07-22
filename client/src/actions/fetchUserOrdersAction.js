import httpClient from "../utils/httpClient";
import {fetchUserOrdersActionTypes} from "./actionTypes";
import * as NotificationsActions from "./notificationsActions";

export const beginLoading = () => ({type: fetchUserOrdersActionTypes.USER_ORDERS_BEGIN_LOADING});
export const endLoading = () => ({type: fetchUserOrdersActionTypes.USER_ORDERS_END_LOADING});

export const fetchUserOrders = (userId) => async dispatch => {
    dispatch(beginLoading());
    try {
        const res = await httpClient.get(`/orders/user/${userId}`);
        dispatch({type: fetchUserOrdersActionTypes.FETCH_USER_ORDERS, orders: res.data.orders});
        console.info(res);
    } catch (err) {
        dispatch(NotificationsActions.notifyError('An error occurred while trying to fetch the orders.'))
        console.error(err);
    } finally {
        dispatch(endLoading());
    }
};