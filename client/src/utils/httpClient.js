import Axios from 'axios';

const HttpClient = Axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true
});

export default HttpClient;