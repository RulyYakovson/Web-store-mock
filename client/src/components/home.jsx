import React from 'react';
import { connect } from 'react-redux';

const Home = ({ user, isLoading }) => {
    const logoutAction = () => {
        localStorage.removeItem('user');
    }

    return(
        <div>
            <h1>HOME</h1>
            <button onClick={ logoutAction }>
                <span>Logout</span>
            </button>
            <h1>{`${user && user.name} ${user && user.role}`}</h1>
        </div>
    );
};

export default connect(store => ({
    user: store.login.user,
    isLoading: store.login.isLoading
}))(Home);