import { go } from 'connected-react-router';
import actions from './actions';
import authorization, { setTokenToStorage, logOut } from './utils';

const { authorizeRequest, authorizeReceive, authorizeFail, logout } = actions;

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

const logingOut = () => dispatch => {
  dispatch(go('/login'));
  logOut();
  dispatch(logout());
};

export default {
  authorize,
  logingOut,
};
