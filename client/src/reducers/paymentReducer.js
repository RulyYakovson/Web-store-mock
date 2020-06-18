import { paymentActionTypes } from '../actions/actionTypes';

const defaultAction = { type: null, orders: null };
const defaultState = { order: null, isLoading: false, success: false, failed: false };

const paymentBeginLoading = state => ({ ...state, isLoading: true });
const paymentEndLoading = state => ({ ...state, isLoading: false });
const paymentSuccess = state => ({ ...state, success: true });
const paymentFailed = state => ({ ...state, failed: true });

const setOrders = (state, action) => ({
    ...state,
    orders: action.orders
});

export default function orders(state = { ...defaultState }, action = { ...defaultAction }) {
    switch(action.type) {
        case paymentActionTypes.PAYMENT_BEGIN_LOADING:
            return paymentBeginLoading(state);
        case paymentActionTypes.PAYMENT_END_LOADING:
            return paymentEndLoading(state);
        case paymentActionTypes.GET_PAYMENT_SUCCESS:
            return paymentSuccess(state);
        case paymentActionTypes.GET_PAYMENT_FAILED:
            return paymentFailed(state);
        case paymentActionTypes.FETCH_PAYMENTS:
            return setOrders(state, action);
        default:
            return state;
    }
};