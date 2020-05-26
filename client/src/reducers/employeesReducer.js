import { fetchEmployeesActionTypes } from '../actions/actionTypes';

const defaultAction = { type: null, employees: null };
const defaultState = { employees: null, isLoading: false };

const loginBeginLoading = state => ({ ...state, isLoading: true });
const loginEndLoading = state => ({ ...state, isLoading: false });

const setEmployees = (state, action) => ({
    ...state,
    employees: action.employees
});

export default function users(state = { ...defaultState }, action = { ...defaultAction }) {
    switch(action.type) {
        case fetchEmployeesActionTypes.EMPLOYEES_BEGIN_LOADING:
            return loginBeginLoading(state);
        case fetchEmployeesActionTypes.EMPLOYEES_END_LOADING:
            return loginEndLoading(state);
        case fetchEmployeesActionTypes.FETCH_EMPLOYEES:
            return setEmployees(state, action);
        default:
            return state;
    }
};