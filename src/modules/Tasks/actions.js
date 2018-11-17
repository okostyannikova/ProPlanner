import types from './types';

export const loadTasksStart = () => ({
  type: types.LOAD_TASKS_START,
});

export const loadTasksSuccess = tasks => ({
  type: types.LOAD_TASKS_SUCCESS,
  payload: { tasks },
});

export const loadTasksFail = error => ({
  type: types.LOAD_TASKS_FAIL,
  error,
});

export const unloadAllTasks = () => ({
  type: types.UNLOAD_ALL_TASKS,
});
