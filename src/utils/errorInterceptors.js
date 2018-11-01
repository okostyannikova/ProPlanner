import axios from 'axios';
import { error, info } from 'react-notification-system-redux';
import { authorizeOperations } from 'modules/Authentication';
import store from 'modules/configureStore';

export const notificationErrorOpts = ({ response }) => ({
  title: response.status,
  message: response.data.error[0].message || response.statusText,
  position: 'br',
  autoDismiss: 30,
  dismissible: false,
  action: {
    label: 'GOT IT',
  },
});

export const notificationSync = {
  title: 'Synchronization successful',
  position: 'br',
  autoDismiss: 10,
  dismissible: false,
  action: {
    label: 'GOT IT',
  },
};

axios.interceptors.response.use(
  config => config,
  err => {
    if (err.response.status === 403) store.dispatch(authorizeOperations.logingOut());
    if (err.response.status === 422) store.dispatch(info(notificationSync));
    else store.dispatch(error(notificationErrorOpts(err)));
  }
);
