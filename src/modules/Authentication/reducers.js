import types from './types';

let user = {};

try {
  user = JSON.parse(localStorage.getItem('user'));
} catch (err) {
  console.error('err', err);
  localStorage.removeItem('user');
  user = JSON.parse(localStorage.getItem('user'));
}

const initialState = user ? { user, loggedIn: true, loading: false, error: null } : {};

const authorizeReducer = (state = initialState, action) => {
  const newUser = JSON.parse(localStorage.getItem('user'));
  const { error, payload } = action;
  const { user: initialUser } = state;

  switch (action.type) {
    case types.AUTHORIZE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case types.AUTHORIZE_RECEIVE:
      return {
        ...state,
        loggedIn: true,
        user: newUser,
        loading: false,
        error: null,
      };

    case types.UPDATE_USER_DATA:
      return {
        ...state,
        user: { ...initialUser, user: payload.updatedUser },
      };

    case types.AUTHORIZE_FAIL:
      return {
        ...state,
        loading: false,
        error,
      };

    case types.LOG_OUT:
      return {};

    default:
      return state;
  }
};

export default authorizeReducer;
