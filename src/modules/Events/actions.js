import axios from 'axios';
import moment from 'moment';
import { LOAD_EVENTS } from './types';
import { authHeader } from '../../utils/auth';

const normalizeData = data =>
  data.map(ev => ({
    id: ev.id,
    attributes: {
      ...ev.attributes,
      'start-date': moment(ev.attributes['start-date']),
      'end-date': moment(ev.attributes['end-date']),
    },
  }));

const allEventsURL = 'http://backend.proplanner.formula1.cloud.provectus-it.com/events/';

export const loadEvents = () => dispatch => {
  axios(allEventsURL, { headers: authHeader() })
    .then(res => {
      const events = normalizeData(res.data.data);
      dispatch({
        type: LOAD_EVENTS,
        payload: { events },
      });
    })
    .catch(err => console.log(err));
};
