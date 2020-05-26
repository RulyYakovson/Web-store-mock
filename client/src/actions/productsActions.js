import httpClient from '../utils/httpClient';
import {fetchProductsActionTypes} from './actionTypes';
import * as NotificationsActions from "./notificationsActions";

export const beginLoading = () => ({type: fetchProductsActionTypes.PRODUCTS_BEGIN_LOADING});
export const endLoading = () => ({type: fetchProductsActionTypes.PRODUCTS_END_LOADING});

export const fetchProducts = () => async dispatch => {
    dispatch(beginLoading());
    try {
        const res = await httpClient.get('/flower/all');
        dispatch({type: fetchProductsActionTypes.FETCH_PRODUCTS, products: res.data.flowers});
        console.info(res);
    } catch (err) {
        dispatch(NotificationsActions.notifyError('An error occurred while trying to fetch the products.'))
        console.error(err);
    } finally {
        dispatch(endLoading());
    }
};

// export const addEmployee = (employee) => async dispatch => {
//     dispatch(beginLoading());
//     try {
//         const {email, firstName, lastName} = employee;
//         const requestData = {
//             ...employee,
//             username: email,
//             password: encrypt('1234'), // TODO: send email
//             address: email
//         };
//         const res = await httpClient.post('/employee/add', requestData);
//         dispatch(NotificationsActions.notifySuccess(`Employee ${firstName} ${lastName} added successfully.`));
//         console.info(res);
//         dispatch(fetchEmployees())
//     } catch (err) {
//         if (err.response && err.response.status === 400) {
//             dispatch(NotificationsActions.notifyError('User with the given username or ID is already exist'));
//         } else {
//             dispatch(NotificationsActions.notifyError('An error occurred while trying to add the employee.'))
//         }
//         dispatch(endLoading())
//         console.error(err);
//     }
// };

// export const updateProducts = (product) => async dispatch => {
//     dispatch(beginLoading());
//     const {email, firstName, lastName} = product;
//     const requestData = {
//         ...product,
//         username: email,
//         address: email
//     };
//     try {
//         const res = await httpClient.post('/employee/update', requestData);
//         dispatch(NotificationsActions.notifySuccess(`Employee ${firstName} ${lastName} updated successfully.`));
//         console.info(res);
//         dispatch(fetchEmployees())
//     } catch (err) {
//         dispatch(NotificationsActions.notifyError('An error occurred while trying to update the employee.'))
//         dispatch(endLoading())
//         console.error(err);
//     }
// };

export const deleteProduct = (productName) => async dispatch => {
    dispatch(beginLoading());
    try {
        const res = await httpClient.delete(`flower/remove/${productName}`);
        dispatch(NotificationsActions.notifyWarning(`Product ${productName} removed from products list.`));
        console.info(res);
        dispatch(fetchProducts())
    } catch (err) {
        dispatch(NotificationsActions.notifyError('An error occurred while trying to delete the product.'))
        dispatch(endLoading())
        console.error(err);
    }
};