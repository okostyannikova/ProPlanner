import types from './types';

const authorizeRequest = () => ({
  type: types.AUTHORIZE_REQUEST,
});

const authorizeReceive = () => ({
  type: types.AUTHORIZE_RECEIVE,
});

const authorizeFail = error => ({
  type: types.AUTHORIZE_FAIL,
  error,
});

const initialization = () => ({
  type: types.INITIALIZATION,
});

const logout = () => ({
  type: types.LOG_OUT,
});

export default {
  authorizeRequest,
  authorizeReceive,
  authorizeFail,
  logout,
  initialization,
};
