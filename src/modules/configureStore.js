import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import testReducer from './Test';
import mounthlyCalendar from './Calendar';

const rootReducer = combineReducers({
  testReducer,
  mounthlyCalendar,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk /* logger */),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
