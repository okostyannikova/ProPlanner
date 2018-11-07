import types from './types';

export const loadEventsStart = () => ({
  type: types.LOAD_EVENTS_START,
});

export const loadEventsSuccess = (events, lastPageNumber) => ({
  type: types.LOAD_EVENTS_SUCCESS,
  payload: { events, lastPageNumber },
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

export const loadSingleEventStart = () => ({
  type: types.LOAD_SINGLE_EVENT_START,
});

export const loadSingleEventSuccess = event => ({
  type: types.LOAD_SINGLE_EVENT_SUCCESS,
  payload: { event },
});

export const loadSingleEventFail = error => ({
  type: types.LOAD_SINGLE_EVENT_FAIL,
  error,
});

export const removeSingleEvent = () => ({
  type: types.REMOVE_SINGLE_EVENT,
});

export const updateEventStart = data => ({
  type: types.UPDATE_SINGLE_EVENT_START,
  payload: { data },
});

export const updateEventSuccess = event => ({
  type: types.UPDATE_SINGLE_EVENT_SUCCESS,
  payload: { event },
});

export const updateEventFail = error => ({
  type: types.UPDATE_SINGLE_EVENT_FAIL,
  error,
});

export const createEventStart = data => ({
  type: types.CREATE_SINGLE_EVENT_START,
  payload: { data },
});

export const createEventSuccess = event => ({
  type: types.CREATE_SINGLE_EVENT_SUCCESS,
  payload: { event },
});

export const createEventFail = error => ({
  type: types.CREATE_SINGLE_EVENT_FAIL,
  error,
});

export const restoreEventsState = () => ({
  type: types.RESTORE_EVENTS_STATE,
});

export const setEventsFilter = filter => ({
  type: types.SET_FILTER,
  payload: { filter },
});

export const seacrhEvents = search => ({
  type: types.SEARCH_EVENTS,
  payload: { search },
});

export const syncStart = () => ({
  type: types.SYNC_EVENTS_START,
});

export const syncSuccess = () => ({
  type: types.SYNC_EVENTS_SUCCESS,
});

export const syncFail = error => ({
  type: types.SYNC_EVENTS_FAIL,
  error,
});
