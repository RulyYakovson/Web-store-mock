import { loginActionTypes } from '../actions/actionTypes';

const defaultAction = { type: null, user: null };

const defaultState = { user: null, isLoading: false };

const loginBeginLoading = state => ({ ...state, isLoading: true });
const loginEndLoading = state => ({ ...state, isLoading: false });

const setUser = (state, action) => ({
    ...state,
    user: action.user
});

export default function login(state = { ...defaultState }, action = { ...defaultAction }) {
    switch(action.type) {
        case loginActionTypes.BEGIN_LOADING:
            return loginBeginLoading(state);
        case loginActionTypes.END_LOADING:
            return loginEndLoading(state);
        case loginActionTypes.AUTH_FINISH:
            return setUser(state, action);
        default:
            return state;
    }
};