import { fetchContactMessagesActionTypes } from '../actions/actionTypes';

const defaultAction = { type: null, messages: null };
const defaultState = { message: null, isLoading: false };

const loginBeginLoading = state => ({ ...state, isLoading: true });
const loginEndLoading = state => ({ ...state, isLoading: false });

const setMessages = (state, action) => ({
    ...state,
    messages: action.messages
});

export default function messages(state = { ...defaultState }, action = { ...defaultAction }) {
    switch(action.type) {
        case fetchContactMessagesActionTypes.CONTACT_BEGIN_LOADING:
            return loginBeginLoading(state);
        case fetchContactMessagesActionTypes.CONTACT_END_LOADING:
            return loginEndLoading(state);
        case fetchContactMessagesActionTypes.FETCH_CONTACT_MESSAGES:
            return setMessages(state, action);
        default:
            return state;
    }
};