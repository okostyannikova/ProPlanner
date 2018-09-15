// global reducers

import { combineReducers } from 'redux';
import authorizeReducer from './Authentication';
import calendarReducer from './Calendar';
import eventsReducer from './Events';

const rootReducer = combineReducers({
  auth: authorizeReducer,
  calendar: calendarReducer,
  events: eventsReducer,
});

export default rootReducer;
