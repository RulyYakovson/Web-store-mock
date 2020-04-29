import httpclient from '../utils/httpClient';
import { loginActionTypes } from './actionTypes';

export const beginLoading = () => ({ type: loginActionTypes.BEGIN_LOADING });
export const endLoading = () => ({ type: loginActionTypes.END_LOADING });

export const login = () => async dispatch => {
    dispatch(beginLoading());
    try {
        const response = await httpclient.post('/login', { userName: 'name', password: 'pass' });
        dispatch({ type: loginActionTypes.LOGIN_OK, user: response.data.user });
        console.log(response);
        dispatch(endLoading());
    } catch (err) {
        console.log(err.message);
        console.log(err);
        dispatch(endLoading());
    }
}