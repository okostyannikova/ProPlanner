import { SET_WORKING_TIME } from './types';
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
