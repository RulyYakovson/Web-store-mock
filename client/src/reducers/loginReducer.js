import { loginActionTypes } from '../actions/actionTypes';

const defaultAction = { type: null, user: null };
const defaultState = { user: null, isLoading: false, isUpdateLoading: false };

const loginBeginLoading = state => ({ ...state, isLoading: true });
const loginEndLoading = state => ({ ...state, isLoading: false });
const updateBeginLoading = state => ({ ...state, isUpdateLoading: true });
const updateEndLoading = state => ({ ...state, isUpdateLoading: false });

const setUser = (state, action) => ({
    ...state,
    user: action.user
});

export default function login(state = { ...defaultState }, action = { ...defaultAction }) {
    switch(action.type) {
        case loginActionTypes.LOGIN_BEGIN_LOADING:
            return loginBeginLoading(state);
        case loginActionTypes.LOGIN_END_LOADING:
            return loginEndLoading(state);
        case loginActionTypes.UPDATE_BEGIN_LOADING:
            return updateBeginLoading(state);
        case loginActionTypes.UPDATE_END_LOADING:
            return updateEndLoading(state);
        case loginActionTypes.AUTH_FINISH:
            return setUser(state, action);
        case loginActionTypes.AUTH_FALSE:
            return setUser(state, defaultAction);
        default:
            return state;
    }
};