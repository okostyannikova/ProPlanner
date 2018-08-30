// global reducers

import { combineReducers } from 'redux';
import authorizeReducer from 'modules/Authentication/index.js';
import calendarReducer from './Calendar';

const rootReducer = combineReducers({
  auth: authorizeReducer,
  calendar: calendarReducer,
});

export default rootReducer;
