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

// switch (action.type) {
//   case types.AUTHORIZE:
//     console.log('auth');
//     authorize()
//       .then(res => {
//         console.log(res);
//         return res;
//       })
//       .catch(err => {
//         console.log(err);
//         return false;
//       });
//     return state;

//   case types.AUTO_LOGIN:
//     autoLogin();
//     return state;

//   case types.LOG_OUT:
//     console.log('You definitly log out');
//     break;

//   default:
//     return state;
// }
