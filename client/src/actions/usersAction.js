import httpClient from '../utils/httpClient';
import {fetchUsersActionTypes} from './actionTypes';

export const beginLoading = () => ({type: fetchUsersActionTypes.USERS_BEGIN_LOADING});
export const endLoading = () => ({type: fetchUsersActionTypes.USERS_END_LOADING});

export const fetchUsers = () => async dispatch => {
    dispatch(beginLoading());
    try {
        const res = await httpClient.get('/customer/all');
        dispatch({type: fetchUsersActionTypes.FETCH_USERS, users: res.data.users});
        console.info(res);
    } catch (err) {
        console.error(err);
    } finally {
        dispatch(endLoading());
    }
};