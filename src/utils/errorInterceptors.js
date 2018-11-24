import axios from 'axios';
import { error } from 'react-notification-system-redux';
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

axios.interceptors.response.use(
  config => config,
  err => {
    if (err.response.status === 403) store.dispatch(authorizeOperations.logingOut());
    else store.dispatch(error(notificationErrorOpts(err)));
  }
);
