import { combineReducers } from 'redux';
import login from './loginReducer';
import users from './usersReducer';

export default combineReducers({
    login,
    users
});