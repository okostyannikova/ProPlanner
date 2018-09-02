import axios from 'axios';
import moment from 'moment';
import { LOAD_EVENTS } from './types';
import { authHeader } from '../../utils/auth';

const fakeType = () => {
  const types = ['work', 'personal', 'other'];
  const rand = Math.floor(Math.random() * types.length);
  return types[rand];
};

const normalizeData = data =>
  data.map(ev => ({
    id: ev.id,
    attributes: {
      ...ev.attributes,
      type: fakeType(),
      'start-date': moment(ev.attributes['start-date']).add(-3, 'hours'),
      'end-date': moment(ev.attributes['end-date']).add(-3, 'hours'),
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
