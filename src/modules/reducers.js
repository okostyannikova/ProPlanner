// global reducers

import { combineReducers } from 'redux';
import authorizeReducer from './Authentication/index.js';
import calendarReducer from './Calendar';
import eventsReducer from './Events/reducers';

const rootReducer = combineReducers({
  auth: authorizeReducer,
  calendar: calendarReducer,
  events: eventsReducer,
});

export default rootReducer;
