import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducer from './modules/Test.js';
import mounthlyCalendar from './modules/calendar';

const rootReducer = combineReducers({
  reducer,
  mounthlyCalendar,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
