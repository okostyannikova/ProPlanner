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
} from './actions';
import { normalizeData, normalizeSingleData, normalizePatchData } from './utils';
import { authHeader } from '../../utils/auth';
import { apiURL } from '../../config';

const eventsURL = `${apiURL}/events/`;

const loadEvents = () => dispatch => {
  dispatch(loadEventsStart());

  axios(eventsURL, { headers: authHeader() })
    .then(res => {
      const events = normalizeData(res.data.data);
      dispatch(loadEventsSuccess(events));
    })
    .catch(err => {
      dispatch(loadEventsFail(err));
      throw new Error(err);
    });
};

const loadSingleEvent = id => dispatch => {
  dispatch(loadSingleEventStart());

  axios(`${eventsURL}${id}`, { headers: authHeader() })
    .then(res => {
      const event = normalizeSingleData(res.data.data);
      dispatch(loadSingleEventSuccess(event));
    })
    .catch(err => {
      dispatch(loadSingleEventFail(err));
      throw new Error(err);
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
    .patch(`${eventsURL}${id}`, normalizedData, { headers: authHeader() })
    .then(res => {
      console.log(res);
      dispatch(updateEventSuccess(res));
    })
    .catch(err => {
      console.log(err);
      dispatch(updateEventFail(err));
      // throw new Error(err);
    });
};

export default {
  loadEvents,
  loadSingleEvent,
  deleteSingleEvent,
  patchEvent,
};
