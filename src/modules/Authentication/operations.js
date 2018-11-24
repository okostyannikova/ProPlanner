import { go } from 'connected-react-router';
import axios from 'axios';
import actions from './actions';
import authorization, { setTokenToStorage, updateLocalStorage, logOut } from './utils';
import { apiURL } from '../../config';

const { authorizeRequest, authorizeReceive, authorizeFail, logout, updateUser } = actions;

const userDataURL = `${apiURL}/my_data`;

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

const updateUserData = () => dispatch => {
  axios(userDataURL).then(res => {
    if (res.status === 200) {
      dispatch(updateUser(res.data));
      updateLocalStorage(res.data);
    }
  });
};

export default {
  authorize,
  logingOut,
  updateUserData,
};
