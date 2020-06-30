import Axios from 'axios';
import {removeUserLocal} from "../actions/loginActions";
import {loginActionTypes} from "../actions/actionTypes";
import * as NotificationsActions from "../actions/notificationsActions";

const HttpClient = Axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true
});

HttpClient.setUp = (dispatch, history) => {
    const onFulfilled = response => response;
    const onRejected = error => {
        if (error.response.status === 403) {
            dispatch({type: loginActionTypes.AUTH_FALSE});
            dispatch(NotificationsActions.notifyWarning('', 'SESSION EXPIRED')) // TODO:
            localStorage.removeItem('user');
            window.location.href = '/session-expired'
            console.error(error);
        }
        return Promise.reject(error);
    };

    HttpClient.interceptors.response.use(onFulfilled, onRejected)
};

export default HttpClient;