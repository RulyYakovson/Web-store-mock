import { combineReducers } from 'redux';
import login from './loginReducer';
import users from './usersReducer';
import employees from './employeesReducer';
import products from './productsReducer';
import messages from './contactMessagesReducer';

export default combineReducers({
    login,
    users,
    employees,
    products,
    messages
});