import httpClient from '../utils/httpClient';
import {fetchContactMessagesActionTypes} from './actionTypes';
import * as NotificationsActions from "./notificationsActions";

export const beginLoading = () => ({type: fetchContactMessagesActionTypes.CONTACT_BEGIN_LOADING});
export const endLoading = () => ({type: fetchContactMessagesActionTypes.CONTACT_END_LOADING});

export const fetchContactMessages = () => async dispatch => {
    dispatch(beginLoading());
    try {
        const res = await httpClient.get('/contacts/all');
        dispatch({type: fetchContactMessagesActionTypes.FETCH_CONTACT_MESSAGES, messages: res.data.messages});
        console.info(res);
    } catch (err) {
        dispatch(NotificationsActions.notifyError('An error occurred while trying to fetch the messages.'))
        console.error(err);
    } finally {
        dispatch(endLoading());
    }
};

export const addContact = (email, name, message) => async dispatch => {
    dispatch(beginLoading());
    try {
        const res = await httpClient.post('/contacts/add', {email, name, message});
        dispatch(NotificationsActions.notifySuccess(`Your message sent successfully.`));
        console.info(res);
        return true;
    } catch (err) {
        dispatch(NotificationsActions.notifyError('An error occurred while trying to sent the message.'))
        console.error(err);
        return false;
    } finally {
        dispatch(endLoading())
    }
};

export const updateContactMessageStatus = (id, status) => async dispatch => {
    dispatch(beginLoading());
    try {
        const res = await httpClient.post('/contacts/update/status', {id, status});
        dispatch(NotificationsActions.notifySuccess(`Message status update to ${status}.`));
        console.info(res);
    } catch (err) {
        dispatch(NotificationsActions.notifyError('An error occurred while trying to update message status.'))
        console.error(err);
    } finally {
        dispatch(endLoading())
    }
};
