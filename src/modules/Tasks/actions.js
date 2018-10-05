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

export const updateTaskStart = data => ({
  type: types.UPDATE_TASK_START,
  payload: { data },
});

export const updateTaskSuccess = task => ({
  type: types.UPDATE_TASK_SUCCESS,
  payload: { task },
});

export const updateTaskFail = error => ({
  type: types.UPDATE_TASK_FAIL,
  error,
});

export const createTaskStart = data => ({
  type: types.CREATE_TASK_START,
  payload: { data },
});

export const createTaskSuccess = task => ({
  type: types.CREATE_TASK_SUCCESS,
  payload: { task },
});

export const createTaskFail = error => ({
  type: types.CREATE_TASK_FAIL,
  error,
});

export const deleteTaskStart = () => ({
  type: types.DELETE_TASK_START,
});

export const deleteTaskSuccess = data => ({
  type: types.DELETE_TASK_SUCCESS,
  payload: { data },
});

export const deleteTaskFail = error => ({
  type: types.DELETE_TASK_FAIL,
  error,
});
