import moment from 'moment';
import { getEvents } from 'utils/events';
import types from './types';
import { SELECT_DAY, NEXT_DAY, PREV_DAY, RESTORE_CALENDAR } from '../Calendar';
import { convertFilter } from './utils';

const initialState = {
  loading: false,
  deleting: false,
  eventsList: [],
  eventsDayList: [],
  eventsSingleEvent: null,
  lastPageNumber: 1,
  error: null,
  filter: [],
  params: {},
  search: null,
  synchronising: false,
  selectedGoal: null,
};

export default (state = initialState, action) => {
  const { type, payload, error } = action;
  const { eventsList, config, eventsDayList } = state;

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
        error: null,
        eventsList: [...eventsList, ...payload.events],
        eventsDayList: eventsDayList.length
          ? eventsDayList
          : getEvents(moment(), [...eventsList, ...payload.events]),
        lastPageNumber: payload.lastPageNumber,
      };
    case SELECT_DAY:
      return {
        ...state,
        eventsDayList: getEvents(moment(payload.day, 'YYYY-M-D'), eventsList),
      };
    case PREV_DAY:
      return {
        ...state,
        eventsDayList: getEvents(payload.day, eventsList),
      };
    case NEXT_DAY:
      return {
        ...state,
        eventsDayList: getEvents(payload.day, eventsList),
      };
    case RESTORE_CALENDAR:
      return {
        ...state,
        eventsDayList: [],
      };
    case types.LOAD_EVENTS_FAIL:
      return {
        ...state,
        loading: false,
        error,
      };
    case types.DELETE_EVENT_START:
      return {
        ...state,
        deleting: true,
      };
    case types.DELETE_EVENT_SUCCESS:
      return {
        ...state,
        deleting: false,
        error: null,
        eventsList: state.eventsList.filter(ev => ev.id !== payload.id),
      };
    case types.DELETE_EVENT_FAIL:
      return {
        ...state,
        deleting: false,
        error,
      };

    case types.LOAD_SINGLE_EVENT_START:
      return {
        ...state,
        loading: true,
      };
    case types.LOAD_SINGLE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        eventsSingleEvent: payload.event,
      };
    case types.LOAD_SINGLE_EVENT_FAIL:
      return {
        ...state,
        loading: false,
        error,
      };

    case types.REMOVE_SINGLE_EVENT:
      return {
        ...state,
        loading: false,
        eventsSingleEvent: null,
      };

    case types.UPDATE_SINGLE_EVENT_START:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_SINGLE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.UPDATE_SINGLE_EVENT_FAIL:
      return {
        ...state,
        loading: false,
        error,
      };

    case types.CREATE_SINGLE_EVENT_START:
      return {
        ...state,
        loading: true,
      };
    case types.CREATE_SINGLE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        eventsSingleEvent: payload.res,
        eventsList: [payload.event, ...state.eventsList],
      };
    case types.CREATE_SINGLE_EVENT_FAIL:
      return {
        ...state,
        loading: false,
        error,
      };
    case types.RESTORE_EVENTS_STATE:
      return {
        ...state,
        eventsList: [],
      };
    case types.SET_FILTER:
      return {
        ...state,
        filter: payload.filter,
        params: { ...config, ...convertFilter(payload.filter) },
      };
    case types.SEARCH_EVENTS:
      return {
        ...state,
        search: payload.search,
      };
    case types.SYNC_EVENTS_START:
      return {
        ...state,
        synchronising: true,
      };
    case types.SYNC_EVENTS_SUCCESS:
      return {
        ...state,
        synchronising: false,
      };

    case types.SHOW_SELECTED_GOAL_START:
      return {
        ...state,
      };

    case types.SHOW_SELECTED_GOAL_SUCCES:
      return {
        ...state,
        selectedGoal: [
          {
            value: payload.id.id,
            label: payload.id.attributes.title,
          },
        ],
      };
    case types.SHOW_SELECTED_GOAL_FAIL:
      return {
        ...state,
        error,
      };

    case types.REMOVE_SELECTED_GOAL:
      return {
        ...state,
        selectedGoal: null,
      };
    default:
      return state;
  }
};
