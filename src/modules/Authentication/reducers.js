import types from './types';

let user = {};

try {
  user = JSON.parse(localStorage.getItem('user'));
} catch (err) {
  console.error('err', err);
  localStorage.removeItem('user');
  user = JSON.parse(localStorage.getItem('user'));
}

const initialState = user ? { loggedIn: true, user } : {};

const authorizeReducer = (state = initialState, action) => {
  const newUser = JSON.parse(localStorage.getItem('user'));

  switch (action.type) {
    case types.AUTHORIZE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case types.AUTHORIZE_RECEIVE:
      return {
        loggedIn: true,
        user: newUser,
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
