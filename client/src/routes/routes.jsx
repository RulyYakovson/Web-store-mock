import React from 'react';
import { Redirect, Route, Router } from 'react-router-dom';
import Login from '../components/login';
import Home from '../components/home';

const Routes = ({ history }) => {
    return(
        <Router history={ history }>
            {localStorage.user ? 
                <Redirect from='/' to='/home' />
                : <Redirect from='/' to='/login' />
            }
            <Route path='/login' render={ () => <Login history={ history }/> }/>
            <Route path='/home' render={ () => <Home /> }/>
        </Router>
    );
};

export default Routes;