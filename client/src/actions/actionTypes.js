export const isLoadingActionTypes = {
    BEGIN_LOADING: 'BEGIN_LOADING',
    END_LOADING: 'END_LOADING'
};

export const loginActionTypes = {
    LOGIN_BEGIN_LOADING: 'LOGIN_BEGIN_LOADING',
    LOGIN_END_LOADING: 'LOGIN_END_LOADING',
    AUTH_FINISH: 'AUTH_FINISH',
    AUTH_FALSE: 'AUTH_FALSE'
};

export const fetchUsersActionTypes = {
    USERS_BEGIN_LOADING: 'USERS_BEGIN_LOADING',
    USERS_END_LOADING: 'USERS_END_LOADING',
    FETCH_USERS: 'SET_USERS_DATA'
};

export const fetchProductsActionTypes = {
    PRODUCTS_BEGIN_LOADING: 'PRODUCTS_BEGIN_LOADING',
    PRODUCTS_END_LOADING: 'PRODUCTS_END_LOADING',
    FETCH_PRODUCTS: 'SET_PRODUCTS_DATA'
};

export const fetchEmployeesActionTypes = {
    EMPLOYEES_BEGIN_LOADING: 'EMPLOYEES_BEGIN_LOADING',
    EMPLOYEES_END_LOADING: 'EMPLOYEES_END_LOADING',
    FETCH_EMPLOYEES: 'SET_EMPLOYEES_DATA'
};

export const fetchContactMessagesActionTypes = {
    CONTACT_BEGIN_LOADING: 'CONTACT_BEGIN_LOADING',
    CONTACT_END_LOADING: 'CONTACT_END_LOADING',
    CONTACT_ROW_BEGIN_LOADING: 'CONTACT_ROW_BEGIN_LOADING',
    CONTACT_ROW_END_LOADING: 'CONTACT_ROW_END_LOADING',
    FETCH_CONTACT_MESSAGES: 'SET_CONTACT_MESSAGES'
};

export const paymentActionTypes = {
    PAYMENT_BEGIN_LOADING: 'PAYMENT_BEGIN_LOADING',
    PAYMENT_END_LOADING: 'PAYMENT_END_LOADING',
    FETCH_PAYMENTS: 'SET_PAYMENTS_DATA',
    GET_PAYMENT_SUCCESS: 'GET_PAYMENT_SUCCESS',
    GET_PAYMENT_FAILED: 'GET_PAYMENT_FAILED'
};