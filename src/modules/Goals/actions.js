import types from './types';

export const loadGoalsStart = () => ({
  type: types.LOAD_GOALS_START,
});

export const loadGoalsSuccess = goals => ({
  type: types.LOAD_GOALS_SUCCESS,
  payload: { goals },
});

export const loadGoalsFail = err => ({
  type: types.LOAD_GOALS_FAIL,
  payload: { err },
});

export const deleteGoalStart = () => ({
  type: types.DELETE_GOAL_START,
});

export const deleteGoalSuccess = id => ({
  type: types.DELETE_GOAL_SUCCESS,
  payload: { id },
});

export const deleteGoalFail = err => ({
  type: types.DELETE_GOAL_FAIL,
  payload: { err },
});
