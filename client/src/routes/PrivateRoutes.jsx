import React from 'react';
import {Route, Router} from 'react-router-dom';
import Home from '../components/Home';
import Dashboard from '../components/dashboard/Dashboard';
import LoginPage from "../components/auth/LoginPage";

const PrivateRoutes = ({history}) => {
    return (
        <Route path='/home' component={Dashboard}/>
    );
};

export default PrivateRoutes;