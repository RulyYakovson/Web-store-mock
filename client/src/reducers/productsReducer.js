import { fetchProductsActionTypes } from '../actions/actionTypes';

const defaultAction = { type: null, products: null };
const defaultState = { product: null, isLoading: false };

const productBeginLoading = state => ({ ...state, isLoading: true });
const productEndLoading = state => ({ ...state, isLoading: false });

const setUser = (state, action) => ({
    ...state,
    products: action.products
});

export default function users(state = { ...defaultState }, action = { ...defaultAction }) {
    switch(action.type) {
        case fetchProductsActionTypes.PRODUCTS_BEGIN_LOADING:
            return productBeginLoading(state);
        case fetchProductsActionTypes.PRODUCTS_END_LOADING:
            return productEndLoading(state);
        case fetchProductsActionTypes.FETCH_PRODUCTS:
            return setUser(state, action);
        default:
            return state;
    }
};