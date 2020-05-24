import { NotificationManager } from 'react-notifications';

const notifyError = (message, title) => () => NotificationManager.error(message, title, 6000);
const notifyInfo = (message, title) => () => NotificationManager.info(message, title, 6000);
const notifySuccess = (message, title) => () => NotificationManager.success(message, title, 3000);
const notifyWarning = (message, title) => () => NotificationManager.warning(message, title, 6000);

export {
    notifyError,
    notifyInfo,
    notifySuccess,
    notifyWarning
};