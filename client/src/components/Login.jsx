import React from 'react';
import { connect } from 'react-redux';
import * as Action from '../actions/loginActions';

const Login = ({ dispatch, user, isLoading, history }) => {
    const signInAction = async () => {
        await dispatch(Action.login());
        history.push('/home');
    };

    return(
        <div>
            <button
                onClick={ signInAction }>
                Sign in
            </button>
            <h1>{`${user && user.name} ${user && user.role}`}</h1>
            {isLoading && (
                <h3>is loading... {isLoading}</h3>
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