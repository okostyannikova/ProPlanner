import axios from 'axios';
import { loadTasksStart, loadTasksSuccess, loadTasksFail, unloadAllTasks } from './actions';
import { normalizeData } from './utils';
import { apiURL } from '../../config';

const eventsURL = `${apiURL}/events`;

const loadTasks = id => dispatch => {
  dispatch(loadTasksStart());

  axios(`${eventsURL}/${id}/tasks`)
    .then(res => {
      const normalizedData = normalizeData(res.data.data);
      dispatch(loadTasksSuccess(normalizedData));
    })
    .catch(error => {
      dispatch(loadTasksFail(error));
      throw new Error(error);
    });
};

const unloadTasks = () => dispatch => {
  dispatch(unloadAllTasks());
};

export default {
  loadTasks,
  unloadTasks,
};
