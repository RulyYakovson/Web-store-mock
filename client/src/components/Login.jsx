import React from 'react';
import { connect } from 'react-redux';
import * as Action from '../actions/loginAction';

const Login = ({
    dispatch,
    user,
    isLoading
}) => {
    const signInAction = () => {
        const a = dispatch(Action.login());
        const b = 0;
    };

    return(
        <div>
            <button
                onClick={signInAction}>
                Sign in
            </button>
            <h1>{`${user && user.name} ${user && user.role}`}</h1>
            {isLoading && (
                <h3>is loading = {isLoading}</h3>
            )}
        </div>
    );
};

// Login.defaultProps = {
//     user: { name: 'default name', role: 'defaut role' },
// };

export default connect(store => ({
    user: store.login.user,
    isLoading: store.login.isLoading
}))(Login);