import React, {useEffect, useState} from "react";
import {Redirect, Route} from "react-router-dom";
import {connect} from 'react-redux';
import PrivateRoutes from "./PrivateRoutes";
import {refresh} from "../actions/loginAction";

const RestrictedRoute = ({/*component: Component, */dispatch, user, ...rest}) => {
    // const [allow, setAllow] = useState(!!user);
    //
    // useEffect(() => {
    //     setAllow(!!user);
    // }, [user]);

    // return (
    //     allow ? <Route {...rest} component={PrivateRoutes}/>
    //         : <Route {...rest} render={props => (
    //             <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    //         )} />
    // );

    useEffect(() => {
        async function fetchUser() {
            await dispatch(refresh());
            //history.push(history.location.pathname)
        }
        fetchUser();
    }, []);

    return (
        <Route {...rest} render={props => (
            user ? <PrivateRoutes {...props} />
                : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
        )}/>
    );
};

export default connect(store => ({
    user: store.login.user,
    isLoading: store.login.isLoading,
}))(RestrictedRoute);