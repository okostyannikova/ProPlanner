import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import testReducer from './Test';
import mounthlyCalendar from './Calendar';

const rootReducer = combineReducers({
  testReducer,
  mounthlyCalendar,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
