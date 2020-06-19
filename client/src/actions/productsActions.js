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

export const addProduct = (product) => async dispatch => {
    dispatch(beginLoading());
    try {
        const res = await httpClient.post('/flower/add', product);
        dispatch(NotificationsActions.notifySuccess(`Product ${product.name} added successfully.`));
        console.info(res);
        dispatch(fetchProducts())
    } catch (err) {
        dispatch(NotificationsActions.notifyError('An error occurred while trying to add the product.'))
        dispatch(endLoading())
        console.error(err);
    }
};

export const updateProduct = (product) => async dispatch => {
    const requestData = {
        id: product.id,
        name: product.name,
        description: product.description,
        amount: product.amount,
        price: product.price,
        isSale: product.isSale,
        isNewProduct: product.isNewProduct
    };
    dispatch(beginLoading());
    try {
        const res = await httpClient.post('/flower/update', requestData);
        dispatch(NotificationsActions.notifySuccess(`Product ${product.name} updated successfully.`));
        console.info(res);
        dispatch(fetchProducts())
    } catch (err) {
        dispatch(NotificationsActions.notifyError('An error occurred while trying to update the product.'))
        dispatch(endLoading())
        console.error(err);
    }
};

export const updateImage = (image, id) => async dispatch => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('id', id);
    dispatch(beginLoading());
    try {
        const res = await httpClient.post('/flower/update/image', formData);
        dispatch(NotificationsActions.notifySuccess(`Image uploaded successfully.`));
        console.info(res);
        dispatch(fetchProducts())
    } catch (err) {
        dispatch(NotificationsActions.notifyError('An error occurred while trying to upload the image.'))
        dispatch(endLoading())
        console.error(err);
    }
};

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