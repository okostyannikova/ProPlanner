import axios from 'axios';
import { setWorkingTimeStart, setWorkingTimeSuccess, setWorkingTimeFail } from './actions';
import { apiURL } from '../../config';
import { authorizeOperations } from '../Authentication';

const workTimeURL = `${apiURL}/update_work_time`;

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

export default {
  updateWorkTime,
};
