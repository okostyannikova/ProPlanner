import actions from './actions';
import authorization, { setTokenToStorage, logOut, autoInit } from './utils';

const { authorizeRequest, authorizeReceive, initialization, logout } = actions;

const authorize = () => dispatch => {
  dispatch(authorizeRequest());

  authorization()
    .then(res => {
      setTokenToStorage(res);
      dispatch(authorizeReceive());
    })
    .catch(() => {
      console.log('error');
    });
};

const initialize = () => dispatch => {
  autoInit();
  dispatch(initialization());
};

const logingOut = () => dispatch => {
  logOut();
  dispatch(logout());
};

export default {
  authorize,
  logingOut,
  initialize,
};
