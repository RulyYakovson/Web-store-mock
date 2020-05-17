import Axios from 'axios';
import {removeUserLocal} from "../actions/loginAction";

const HttpClient = Axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true
});

HttpClient.setUp =  (store, history) => {
    const onFulfilled = response => response;
    const onRejected = error => {
        if (error.response.status === 401) {
            console.error('Failed to authenticate user !!!', error);
            store.dispatch(removeUserLocal(history));
        }
        return Promise.reject( error );
    };

    HttpClient.interceptors.response.use(onFulfilled, onRejected)
};

export default HttpClient;