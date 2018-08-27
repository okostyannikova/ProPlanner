// global reducers

import { combineReducers } from 'redux';
import authorizeReducer from 'modules/Authentication/index.js';
import mounthlyCalendar from './Calendar';

const mainReducer = combineReducers({
  auth: authorizeReducer,
  calendar: mounthlyCalendar,
});

export default mainReducer;
