import axios from 'axios';
import {
  loadEventsStart,
  loadEventsSuccess,
  loadEventsFail,
  deleteEventStart,
  deleteEventSuccess,
  deleteEventFail,
} from './actions';
import { normalizeData } from './utils';
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

  /* axios
    .delete(`${eventsURL}/${id}`)
    .then(res => {
      if (res.status === 204) dispatch(deleteEventSuccess(id));
    }) */
  Promise.resolve(id)
    .then(res => {
      dispatch(deleteEventSuccess(res));
    })
    .catch(error => {
      dispatch(deleteEventFail(error));
      throw new Error(error);
    });
};

export default {
  loadEvents,
  deleteEvent,
};
