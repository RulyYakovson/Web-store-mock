import httpClient from '../utils/httpClient';
import {fetchEmployeesActionTypes} from './actionTypes';
import {encrypt} from "../utils/rsa";
import * as NotificationsActions from "./notificationsActions";

export const beginLoading = () => ({type: fetchEmployeesActionTypes.EMPLOYEES_BEGIN_LOADING});
export const endLoading = () => ({type: fetchEmployeesActionTypes.EMPLOYEES_END_LOADING});

export const fetchEmployees = () => async dispatch => {
    dispatch(beginLoading());
    try {
        const res = await httpClient.get('/employee/all');
        dispatch({type: fetchEmployeesActionTypes.FETCH_EMPLOYEES, employees: res.data.employees});
        console.info(res);
    } catch (err) {
        dispatch(NotificationsActions.notifyError('An error occurred while trying to fetch the employees.'))
        console.error(err);
    } finally {
        dispatch(endLoading());
    }
};

export const addEmployee = (employee) => async dispatch => {
    dispatch(beginLoading());
    try {
        const {email, firstName, lastName} = employee;
        const requestData = {
            ...employee,
            username: email,
            password: encrypt('1234'), // TODO: send email
            address: email
        };
        const res = await httpClient.post('/employee/add', requestData);
        dispatch(NotificationsActions.notifySuccess(`Employee ${firstName} ${lastName} added successfully.`));
        console.info(res);
        dispatch(fetchEmployees())
    } catch (err) {
        if (err.response && err.response.status === 400) {
            dispatch(NotificationsActions.notifyError('User with the given username or ID is already exist'));
        } else {
            dispatch(NotificationsActions.notifyError('An error occurred while trying to add the employee.'))
        }
        dispatch(endLoading())
        console.error(err);
    }
};

export const updateEmployee = (employee) => async dispatch => {
    dispatch(beginLoading());
    const {email, firstName, lastName} = employee;
    const requestData = {
        ...employee,
        username: email,
        address: email
    };
    try {
        const res = await httpClient.post('/employee/update', requestData);
        dispatch(NotificationsActions.notifySuccess(`Employee ${firstName} ${lastName} updated successfully.`));
        console.info(res);
        dispatch(fetchEmployees())
    } catch (err) {
        dispatch(NotificationsActions.notifyError('An error occurred while trying to update the employee.'))
        dispatch(endLoading())
        console.error(err);
    }
};

export const deleteEmployee = (empId) => async dispatch => {
    dispatch(beginLoading());
    try {
        const res = await httpClient.delete(`employee/remove/${empId}`);
        dispatch(NotificationsActions.notifyWarning(`Employee removed from employees list.`));
        console.info(res);
        dispatch(fetchEmployees())
    } catch (err) {
        dispatch(NotificationsActions.notifyError('An error occurred while trying to delete the employee.'))
        dispatch(endLoading())
        console.error(err);
    }
};