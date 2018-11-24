import {
  SET_WORKING_TIME,
  SET_DEFAULT_EVENTS_SETTINGS,
  SWITCH_SYNC_TO_GOOGLE_CALENDAR,
} from './types';
import { START, SUCCESS, FAIL } from '../constants';

export const setWorkingTimeStart = () => ({
  type: SET_WORKING_TIME + START,
});

export const setWorkingTimeSuccess = time => ({
  type: SET_WORKING_TIME + SUCCESS,
  payload: { time },
});

export const setWorkingTimeFail = error => ({
  type: SET_WORKING_TIME + FAIL,
  error,
});

export const setDefaulsEventsSettingsStart = () => ({
  type: SET_DEFAULT_EVENTS_SETTINGS + START,
});

export const setDefaulsEventsSettingsSuccess = () => ({
  type: SET_DEFAULT_EVENTS_SETTINGS + SUCCESS,
});

export const setDefaulsEventsSettingsFail = error => ({
  type: SET_DEFAULT_EVENTS_SETTINGS + FAIL,
  error,
});

export const swithSyncToGoogleCalendarStart = () => ({
  type: SWITCH_SYNC_TO_GOOGLE_CALENDAR + START,
});

export const swithSyncToGoogleCalendarSuccess = () => ({
  type: SWITCH_SYNC_TO_GOOGLE_CALENDAR + SUCCESS,
});

export const swithSyncToGoogleCalendarFail = error => ({
  type: SWITCH_SYNC_TO_GOOGLE_CALENDAR + FAIL,
  error,
});
