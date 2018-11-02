import types from './types';

export const loadGoalsStart = () => ({
  type: types.LOAD_GOALS_START,
});

export const loadGoalsSuccess = (goals, lastPageNumber) => ({
  type: types.LOAD_GOALS_SUCCESS,
  payload: { goals, lastPageNumber },
});

export const loadGoalsFail = error => ({
  type: types.LOAD_GOALS_FAIL,
  error,
});

export const deleteGoalStart = () => ({
  type: types.DELETE_GOAL_START,
});

export const deleteGoalSuccess = id => ({
  type: types.DELETE_GOAL_SUCCESS,
  payload: { id },
});

export const deleteGoalFail = error => ({
  type: types.DELETE_GOAL_FAIL,
  error,
});

export const restoreGoalsState = () => ({
  type: types.RESTORE_GOALS_STATE,
});

export const loadSingleGoalStart = () => ({
  type: types.LOAD_SINGLE_GOAL_START,
});

export const loadSingleGoalSuccess = goal => ({
  type: types.LOAD_SINGLE_GOAL_SUCCESS,
  payload: { goal },
});

export const loadSingleGoalFail = error => ({
  type: types.LOAD_SINGLE_GOAL_FAIL,
  error,
});

export const removeSingleGoal = () => ({
  type: types.REMOVE_SINGLE_GOAL,
});

export const updateGoalStart = data => ({
  type: types.UPDATE_SINGLE_GOAL_START,
  payload: { data },
});

export const updateGoalSuccess = goal => ({
  type: types.UPDATE_SINGLE_GOAL_SUCCESS,
  payload: { goal },
});

export const updateGoalFail = error => ({
  type: types.UPDATE_SINGLE_GOAL_FAIL,
  error,
});

export const createGoalStart = data => ({
  type: types.CREATE_SINGLE_GOAL_START,
  payload: { data },
});

export const createGoalSuccess = goal => ({
  type: types.CREATE_SINGLE_GOAL_SUCCESS,
  payload: { goal },
});

export const createGoalFail = error => ({
  type: types.CREATE_SINGLE_GOAL_FAIL,
  error,
});
