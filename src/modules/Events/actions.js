import types from './types';

export const loadEventsStart = () => ({
  type: types.LOAD_EVENTS_START,
});

export const loadEventsSuccess = events => ({
  type: types.LOAD_EVENTS_SUCCESS,
  payload: { events },
});

export const loadEventsFail = err => ({
  type: types.LOAD_EVENTS_FAIL,
  payload: { err },
});

export const deleteEventStart = () => ({
  type: types.DELETE_EVENT_START,
});

export const deleteEventSuccess = id => ({
  type: types.DELETE_EVENT_SUCCESS,
  payload: { id },
});

export const deleteEventFail = err => ({
  type: types.DELETE_EVENT_FAIL,
  payload: { err },
});
