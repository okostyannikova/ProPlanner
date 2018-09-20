// global reducers

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authorizeReducer from './Authentication';
import calendarReducer from './Calendar';
import eventsReducer from './Events';
import goalsReducer from './Goals';

const rootReducer = combineReducers({
  auth: authorizeReducer,
  calendar: calendarReducer,
  events: eventsReducer,
  goals: goalsReducer,
  form: formReducer,
});

export default rootReducer;
