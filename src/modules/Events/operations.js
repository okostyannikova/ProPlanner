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
} from './actions';
import {
  normalizeData,
  normalizeSingleData,
  normalizePatchData,
  normalizeCreateData,
} from './utils';
import { apiURL } from '../../config';

const eventsURL = `${apiURL}/events`;

const loadEvents = () => dispatch => {
  dispatch(loadEventsStart());

  axios(eventsURL)
    .then(res => {
      const events = normalizeData(res.data.data);
      dispatch(loadEventsSuccess(events));
    })
    .catch(error => {
      dispatch(loadEventsFail(error));
      throw new Error(error);
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
      throw new Error(error);
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
      throw new Error(error);
    });
};

const deleteSingleEvent = () => dispatch => {
  dispatch(removeSingleEvent());
};

const patchEvent = data => dispatch => {
  const { id } = data;
  const normalizedData = normalizePatchData(data);

  dispatch(updateEventStart());

  axios
    .patch(`${eventsURL}/${id}`, normalizedData)
    .then(res => {
      dispatch(updateEventSuccess(res));
    })
    .catch(error => {
      dispatch(updateEventFail(error));
      // throw new Error(error);
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
      console.log(error);
      dispatch(createEventFail(error));
      // throw new Error(error);
    });
};

export default {
  loadEvents,
  loadSingleEvent,
  deleteSingleEvent,
  patchEvent,
  addEvent,
  deleteEvent,
};
