import { fetchContactMessagesActionTypes } from '../actions/actionTypes';

const defaultAction = { type: null, messages: null };
const defaultState = { message: null, isLoading: false };

const messagesBeginLoading = state => ({ ...state, isLoading: true });
const messagesEndLoading = state => ({ ...state, isLoading: false });
const messagesRowBeginLoading = state => ({ ...state, isRowLoading: true });
const messagesRowEndLoading = state => ({ ...state, isRowLoading: false });

const setMessages = (state, action) => ({
    ...state,
    messages: action.messages
});

export default function messages(state = { ...defaultState }, action = { ...defaultAction }) {
    switch(action.type) {
        case fetchContactMessagesActionTypes.CONTACT_BEGIN_LOADING:
            return messagesBeginLoading(state);
        case fetchContactMessagesActionTypes.CONTACT_END_LOADING:
            return messagesEndLoading(state);
        case fetchContactMessagesActionTypes.CONTACT_ROW_BEGIN_LOADING:
            return messagesRowBeginLoading(state);
        case fetchContactMessagesActionTypes.CONTACT_ROW_END_LOADING:
            return messagesRowEndLoading(state);
        case fetchContactMessagesActionTypes.FETCH_CONTACT_MESSAGES:
            return setMessages(state, action);
        default:
            return state;
    }
};