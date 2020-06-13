import React from 'react';
import {BrowserRouter, Route, Router, Switch} from 'react-router-dom';
import Dashboard from '../components/dashboard/Dashboard';
import Cash from '../components/cash/Cash';

const PrivateRoutes = ({history, ...rest}) => {
    return (
        // <BrowserRouter history={history}>
        <div>
            <Switch>
                <Route {...rest} path='/home' component={Dashboard}/>
                <Route {...rest} path='/cash' component={Cash}/>
            </Switch>
        </div>
        // </BrowserRouter>
    );
};

export default PrivateRoutes;