import axios from 'axios';
import { LOAD_EVENTS_START, LOAD_EVENTS_SUCCESS, LOAD_EVENTS_FAIL } from './types';
import { normalizeData } from './operations';
import { authHeader } from '../../utils/auth';
import { apiURL } from '../../config';

const allEventsURL = `${apiURL}/events/`;

export const loadEvents = () => dispatch => {
  dispatch({ type: LOAD_EVENTS_START });

  axios(allEventsURL, { headers: authHeader() })
    .then(res => {
      const events = normalizeData(res.data.data);
      dispatch({
        type: LOAD_EVENTS_SUCCESS,
        payload: { events },
      });
    })
    .catch(err => {
      dispatch({
        type: LOAD_EVENTS_FAIL,
        payload: { err },
      });
      throw new Error(err);
    });
};
