import { fetchUsersActionTypes } from '../actions/actionTypes';

const defaultAction = { type: null, users: null };
const defaultState = { user: null, isLoading: false };

const usersBeginLoading = state => ({ ...state, isLoading: true });
const usersEndLoading = state => ({ ...state, isLoading: false });

const setUser = (state, action) => ({
    ...state,
    users: action.users
});

export default function users(state = { ...defaultState }, action = { ...defaultAction }) {
    switch(action.type) {
        case fetchUsersActionTypes.USERS_BEGIN_LOADING:
            return usersBeginLoading(state);
        case fetchUsersActionTypes.USERS_END_LOADING:
            return usersEndLoading(state);
        case fetchUsersActionTypes.FETCH_USERS:
            return setUser(state, action);
        default:
            return state;
    }
};