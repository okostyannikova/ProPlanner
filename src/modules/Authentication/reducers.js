import types from './types';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

const authorizeReducer = (state = initialState, action) => {
  const newUser = JSON.parse(localStorage.getItem('user'));

  switch (action.type) {
    case types.AUTHORIZE_REQUEST:
      console.log('request');
      return {
        ...state,
        loading: true,
      };

    case types.AUTHORIZE_RECEIVE:
      console.log('auth');
      return {
        loggedIn: true,
        newUser,
        loading: false,
      };

    case types.INITIALIZATION:
      return state;

    case types.LOG_OUT:
      return {};

    default:
      return state;
  }
};

export default authorizeReducer;
