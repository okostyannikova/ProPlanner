import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import testReducer from './Test';
import mounthlyCalendar from './Calendar';
import mainReducer from './reducers';

const rootReducer = combineReducers({
  testReducer,
  mounthlyCalendar,
  mainReducer,
});

const middleware = applyMiddleware(thunk);

const store = createStore(
  rootReducer,
  middleware
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
