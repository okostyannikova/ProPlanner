import types from './types';

const initialState = {
  loading: false,
  eventsList: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.LOAD_EVENTS_START:
      return {
        ...state,
        loading: true,
      };
    case types.LOAD_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        eventsList: payload.events,
      };
    case types.LOAD_EVENTS_FAIL:
      return {
        ...state,
        error: payload.err,
      };
    case types.DELETE_EVENT_SUCCESS:
      return {
        ...state,
        eventsList: state.eventsList.filter(ev => ev.id !== payload.id),
      };
    case types.DELETE_EVENT_FAIL:
      return {
        ...state,
        error: payload.err,
      };
    default:
      return state;
  }
};
