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

const eventsURL = `${apiURL}/events/`;

const loadEvents = () => dispatch => {
  dispatch(loadEventsStart());

  axios(eventsURL)
    .then(res => {
      const events = normalizeData(res.data.data);
      dispatch(loadEventsSuccess(events));
    })
    .catch(err => {
      dispatch(loadEventsFail(err));
      throw new Error(err);
    });
};

const deleteEvent = id => dispatch => {
  dispatch(deleteEventStart());

  axios
    .delete(`${eventsURL}/${id}`)
    .then(res => {
      console.log(res);
      dispatch(deleteEventSuccess(id));
    })
    .catch(err => {
      dispatch(deleteEventFail(err));
      throw new Error(err);
    });
};

export default {
  loadEvents,
  deleteEvent,
};
