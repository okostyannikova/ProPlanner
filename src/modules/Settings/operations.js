import axios from 'axios';
import {
  setWorkingTimeStart,
  setWorkingTimeSuccess,
  setWorkingTimeFail,
  setDefaulsEventsSettingsStart,
  setDefaulsEventsSettingsSuccess,
  setDefaulsEventsSettingsFail,
  swithSyncToGoogleCalendarStart,
  swithSyncToGoogleCalendarSuccess,
  swithSyncToGoogleCalendarFail,
} from './actions';
import { apiURL } from '../../config';
import { authorizeOperations } from '../Authentication';

const workTimeURL = `${apiURL}/update_work_time`;
const eventsSettingsURL = `${apiURL}/update_events_attributes`;
const syncToGoogleCalendarURL = `${apiURL}/update_sync_enabled`;

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

const updateSyncToGoogleCalendar = value => dispatch => {
  dispatch(swithSyncToGoogleCalendarStart());

  axios(syncToGoogleCalendarURL, { params: { sync_enabled: value } })
    .then(res => {
      if (res.status === 200) {
        dispatch(swithSyncToGoogleCalendarSuccess());
        dispatch(authorizeOperations.updateUserData());
      }
    })
    .catch(error => dispatch(swithSyncToGoogleCalendarFail(error)));
};

export default {
  updateWorkTime,
  updateEventsSettings,
  updateSyncToGoogleCalendar,
};
