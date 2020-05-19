import Axios from 'axios';
import {removeUserLocal} from "../actions/loginAction";
import {loginActionTypes} from "../actions/actionTypes";

const HttpClient = Axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true
});

HttpClient.setUp = (dispatch, history) => {
    const onFulfilled = response => response;
    const onRejected = error => {
        if (error.response.status === 401) {
            console.error('Failed to authenticate user !!!', error);
            dispatch({type: loginActionTypes.AUTH_FALSE});
            //localStorage.removeItem('user');
            history.push('/session-expired'); // TODO: not working
            // return <Redirect to={{pathname: '/login', state: {from: history.location}}}/>
        }
        return Promise.reject(error);
    };

    HttpClient.interceptors.response.use(onFulfilled, onRejected)
};

export default HttpClient;