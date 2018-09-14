import { LOAD_EVENTS_START, LOAD_EVENTS_SUCCESS, LOAD_EVENTS_FAIL } from './types';

const initialState = {
  loading: false,
  eventsList: null,
};

export default (eventsState = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_EVENTS_START:
      return {
        ...eventsState,
        loading: true,
      };
    case LOAD_EVENTS_SUCCESS:
      return {
        ...eventsState,
        loading: false,
        eventsList: payload.events,
      };
    case LOAD_EVENTS_FAIL:
      return {
        ...eventsState,
        error: payload.err,
      };
    default:
      return eventsState;
  }
};
