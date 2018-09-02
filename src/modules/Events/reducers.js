import { LOAD_EVENTS } from './types';

const initialState = {
  colorTypes: {
    work: '#A9EFEA',
    study: '#FFE07F',
    personal: '#FFBFD4',
  },
  eventsList: null,
};

export default (eventsState = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_EVENTS:
      return {
        ...eventsState,
        eventsList: payload.events,
      };
    default:
      return eventsState;
  }
};
