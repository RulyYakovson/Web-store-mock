import React from 'react';
import {Provider} from 'react-redux';
import {createBrowserHistory} from 'history';
import store from './store';
import Routes from './routes/Routes';
import './App.css';
import HttpClient from "./utils/httpClient";

const App = () => {
    const history = createBrowserHistory();
    HttpClient.setUp(store.dispatch, history);
    return (
        <Provider store={store}>
            <div>
                <Routes history={history}/>
            </div>
        </Provider>
    );
};

export default App;
