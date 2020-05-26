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

export const fetchEmployeesActionTypes = {
    EMPLOYEES_BEGIN_LOADING: 'EMPLOYEES_BEGIN_LOADING',
    EMPLOYEES_END_LOADING: 'EMPLOYEES_END_LOADING',
    FETCH_EMPLOYEES: 'SET_EMPLOYEES_DATA'
};

export const snackBarActionTypes = {
    SUCCESS: 'success',
    INFO: 'info',
    WARNING: 'warning',
    ERROR: 'error'
}