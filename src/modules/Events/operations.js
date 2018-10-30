import axios from 'axios';
import {
  loadEventsStart,
  loadEventsSuccess,
  loadEventsFail,
  loadSingleEventStart,
  loadSingleEventSuccess,
  loadSingleEventFail,
  removeSingleEvent,
  updateEventStart,
  updateEventSuccess,
  updateEventFail,
  createEventStart,
  createEventSuccess,
  createEventFail,
  deleteEventStart,
  deleteEventSuccess,
  deleteEventFail,
  restoreEventsState,
  setEventsFilter,
} from './actions';
import {
  normalizeData,
  normalizeSingleData,
  normalizePatchData,
  normalizeCreateData,
} from './utils';
import { getLastPageNumber } from '../utils';
import { apiURL } from '../../config';

const eventsURL = `${apiURL}/events`;

const loadEvents = (number = 1, size = 50, filter) => dispatch => {
  dispatch(loadEventsStart());

  axios(eventsURL, {
    params: {
      attribute: 'start_date',
      order: 'DESC',
      'page[number]': number,
      'page[size]': size,
      ...filter,
    },
  })
    .then(res => {
      const events = normalizeData(res.data.data);
      const lastPageNumber = getLastPageNumber(res.data.links.last);
      dispatch(loadEventsSuccess(events, lastPageNumber));
    })
    .catch(error => {
      dispatch(loadEventsFail(error));
    });
};

const deleteEvent = id => dispatch => {
  dispatch(deleteEventStart());

  axios
    .delete(`${eventsURL}/${id}`)
    .then(res => {
      if (res.status === 204) dispatch(deleteEventSuccess(id));
    })
    .catch(error => {
      dispatch(deleteEventFail(error));
    });
};

const loadSingleEvent = id => dispatch => {
  dispatch(loadSingleEventStart());

  axios(`${eventsURL}/${id}`)
    .then(res => {
      const event = normalizeSingleData(res.data.data);
      dispatch(loadSingleEventSuccess(event));
    })
    .catch(error => {
      dispatch(loadSingleEventFail(error));
    });
};

const deleteSingleEvent = () => dispatch => {
  dispatch(removeSingleEvent());
};

const patchEvent = (data, id) => dispatch => {
  const normalizedData = normalizePatchData(data);
  dispatch(updateEventStart());

  axios
    .patch(`${eventsURL}/${id}`, normalizedData)
    .then(res => {
      dispatch(updateEventSuccess(res));
    })
    .catch(error => {
      dispatch(updateEventFail(error));
    });
};

const addEvent = data => dispatch => {
  const normalizedData = normalizeCreateData(data);
  dispatch(createEventStart());

  axios
    .post(`${eventsURL}`, normalizedData)
    .then(res => {
      const event = normalizeSingleData(res.data.data);
      dispatch(createEventSuccess(event));
    })
    .catch(error => {
      dispatch(createEventFail(error));
    });
};

const restoreEvents = () => dispatch => dispatch(restoreEventsState());
const setFilter = ({ value }) => dispatch => dispatch(setEventsFilter(value));

export default {
  loadEvents,
  loadSingleEvent,
  deleteSingleEvent,
  patchEvent,
  addEvent,
  deleteEvent,
  restoreEvents,
  setFilter,
};
