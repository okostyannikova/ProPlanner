// global reducers

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as notifications } from 'react-notification-system-redux';
import authorizeReducer from './Authentication';
import calendarReducer from './Calendar';
import eventsReducer from './Events';
import goalsReducer from './Goals';
import tasksReducer from './Tasks';

const rootReducer = combineReducers({
  auth: authorizeReducer,
  calendar: calendarReducer,
  tasks: tasksReducer,
  events: eventsReducer,
  goals: goalsReducer,
  form: formReducer,
  notifications,
});

export default rootReducer;
