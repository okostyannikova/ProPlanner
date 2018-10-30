import axios from 'axios';
import { error } from 'react-notification-system-redux';
import { authorizeOperations } from 'modules/Authentication';
import store from './configureStore';

export const getLastPageNumber = url =>
  Number(url.match(/page%5Bnumber%5D=\d+/i)[0].match(/\d+$/i)[0]);

export const notificationErrorOpts = ({ response }) => ({
  title: response.status,
  message: response.data.error[0].message || response.statusText,
  position: 'br',
  autoDismiss: 0,
  dismissible: false,
  action: {
    label: 'GOT IT',
  },
});

axios.interceptors.response.use(
  config => config,
  err => {
    store.dispatch(error(notificationErrorOpts(err)));
  }
);
