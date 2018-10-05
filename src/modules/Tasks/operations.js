import axios from 'axios';
import {
  loadTasksStart,
  loadTasksSuccess,
  loadTasksFail,
  unloadAllTasks,
  updateTaskStart,
  updateTaskSuccess,
  updateTaskFail,
  createTaskStart,
  createTaskSuccess,
  createTaskFail,
  deleteTaskStart,
  deleteTaskSuccess,
  deleteTaskFail,
} from './actions';
import { normalizeData, normalizeCreateData, normalizeSingleData } from './utils';
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

const updateTask = data => dispatch => {
  console.log('updateTask');
  // dispatch(updateTaskStart());
  // axios(`${eventsURL}/${id}/tasks`)
  //   .then(res => {
  //     const normalizedData = normalizeData(res.data.data);
  //     dispatch(loadTasksSuccess(normalizedData));
  //   })
  //   .catch(error => {
  //     dispatch(loadTasksFail(error));
  //     throw new Error(error);
  //   });
};

const createTask = data => dispatch => {
  const { id, name } = data;
  const normalizedData = normalizeCreateData(name);

  dispatch(createTaskStart());

  axios
    .post(`${eventsURL}/${id}/tasks`, normalizedData)
    .then(res => {
      const task = normalizeSingleData(res.data.data);
      dispatch(createTaskSuccess(task));
    })
    .catch(error => {
      dispatch(createTaskFail(error));
      throw new Error(error);
    });
};

const deleteTask = data => dispatch => {
  const { eventId, task } = data;
  dispatch(deleteTaskStart());

  axios
    .delete(`${eventsURL}/${eventId}/tasks/${task.id}`)
    .then(res => {
      if (res.status === 204) dispatch(deleteTaskSuccess(task.id));
    })
    .catch(error => {
      dispatch(deleteTaskFail(error));
      throw new Error(error);
    });
};

export default {
  loadTasks,
  unloadTasks,
  updateTask,
  createTask,
  deleteTask,
};
