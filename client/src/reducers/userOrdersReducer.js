import {fetchUserOrdersActionTypes} from '../actions/actionTypes';

const defaultAction = {type: null, orders: null};
const defaultState = {order: null, isLoading: false};

const ordersBeginLoading = state => ({...state, isLoading: true});
const ordersEndLoading = state => ({...state, isLoading: false});

const setUserOrders = (state, action) => {
    const {orders} = action;
    orders.sort(function(a,b) {
        return new Date(b.created).getTime() - new Date(a.created).getTime()
    });
    return {...state, orders}
};

export default function userOrders(state = {...defaultState}, action = {...defaultAction}) {
    switch (action.type) {
        case fetchUserOrdersActionTypes.USER_ORDERS_BEGIN_LOADING:
            return ordersBeginLoading(state);
        case fetchUserOrdersActionTypes.USER_ORDERS_END_LOADING:
            return ordersEndLoading(state);
        case fetchUserOrdersActionTypes.FETCH_USER_ORDERS:
            return setUserOrders(state, action);
        default:
            return state;
    }
};