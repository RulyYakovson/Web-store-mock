import httpclient from '../utils/httpClient';
import { loginActionTypes } from './actionTypes';

export const beginLoading = () => ({ type: loginActionTypes.BEGIN_LOADING });
export const endLoading = () => ({ type: loginActionTypes.END_LOADING });

export const login = () => async dispatch => {
    dispatch(beginLoading());
    try {
        const res = await httpclient.post('/login', { userName: 'name', password: 'pass' });
        dispatch({ type: loginActionTypes.LOGIN_OK, user: res.data.user });
        localStorage.setItem('user', JSON.stringify(res.data.user));
        console.log(res);
    } catch (err) {
        console.log(err.message);
        console.log(err);
    } finally {
        dispatch(endLoading());
    }
}