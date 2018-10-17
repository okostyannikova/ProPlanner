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
