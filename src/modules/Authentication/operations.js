import actions from './actions';
import authorization, { setTokenToStorage, logOut, autoInit } from './utils';

const { authorizeRequest, authorizeReceive, authorizeFail, initialization, logout } = actions;

const authorize = () => dispatch => {
  dispatch(authorizeRequest());

  authorization()
    .then(res => {
      setTokenToStorage(res);
      dispatch(authorizeReceive());
    })
    .catch(error => {
      dispatch(authorizeFail(error));
      throw new Error(error);
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
