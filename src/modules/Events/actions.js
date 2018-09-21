import types from './types';

export const loadEventsStart = () => ({
  type: types.LOAD_EVENTS_START,
});

export const loadEventsSuccess = events => ({
  type: types.LOAD_EVENTS_SUCCESS,
  payload: { events },
});

export const loadEventsFail = error => ({
  type: types.LOAD_EVENTS_FAIL,
  error,
});

export const deleteEventStart = () => ({
  type: types.DELETE_EVENT_START,
});

export const deleteEventSuccess = id => ({
  type: types.DELETE_EVENT_SUCCESS,
  payload: { id },
});

export const deleteEventFail = error => ({
  type: types.DELETE_EVENT_FAIL,
  error,
});
