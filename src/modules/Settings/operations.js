import axios from 'axios';
import {
  setWorkingTimeStart,
  setWorkingTimeSuccess,
  setWorkingTimeFail,
  setDefaulsEventsSettingsStart,
  setDefaulsEventsSettingsSuccess,
  setDefaulsEventsSettingsFail,
} from './actions';
import { apiURL } from '../../config';
import { authorizeOperations } from '../Authentication';

const workTimeURL = `${apiURL}/update_work_time`;
const eventsSettingsURL = `${apiURL}/update_events_attributes`;

const updateWorkTime = time => dispatch => {
  dispatch(setWorkingTimeStart());

  axios(workTimeURL, {
    params: {
      work_start_time: time.start,
      work_end_time: time.end,
    },
  })
    .then(res => {
      if (res.status === 200) {
        dispatch(setWorkingTimeSuccess());
        dispatch(authorizeOperations.updateUserData());
      }
    })
    .catch(error => dispatch(setWorkingTimeFail(error)));
};

const updateEventsSettings = settings => dispatch => {
  dispatch(setDefaulsEventsSettingsStart());

  axios(eventsSettingsURL, { params: { ...settings } })
    .then(res => {
      if (res.status === 200) {
        dispatch(setDefaulsEventsSettingsSuccess());
        dispatch(authorizeOperations.updateUserData());
      }
    })
    .catch(error => dispatch(setDefaulsEventsSettingsFail(error)));
};

export default {
  updateWorkTime,
  updateEventsSettings,
};
