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
