import React from 'react';
import {Route, Router} from 'react-router-dom';
import Dashboard from '../components/dashboard/Dashboard';

const PrivateRoutes = ({...rest}) => {
    return (
        <Route {...rest} path='/home' component={Dashboard}/>
    );
};

export default PrivateRoutes;