const countState = 0;

export default function reducer(state = countState, action) {
  switch (action.type) {
    case 'app.increment':
      return state + 1;

    case 'app.dicrement':
      return state - 1;

    default:
      return state;
  }
}

export function increment() {
  return dispatch => {
    dispatch({
      type: 'app.increment',
    });
  };
}

export function dicrement() {
  return dispatch => {
    dispatch({ type: 'app.dicrement' });
  };
}
