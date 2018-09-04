import types from './types';

let user = {};

try {
  user = JSON.parse(localStorage.getItem('user'));
} catch (err) {
  console.log('err', err);
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
