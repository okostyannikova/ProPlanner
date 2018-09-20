import types from './types';

const initialState = {
  loading: false,
  goalsList: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.LOAD_GOALS_START:
      return {
        ...state,
        loading: true,
      };
    case types.LOAD_GOALS_SUCCESS:
      return {
        ...state,
        loading: false,
        goalsList: payload.goals,
      };
    case types.LOAD_GOALS_FAIL:
      return {
        ...state,
        error: payload.err,
      };
    case types.DELETE_GOAL_SUCCESS:
      return {
        ...state,
        goalsList: state.goalsList.filter(goal => goal.id !== payload.id),
      };
    case types.DELETE_GOAL_FAIL:
      return {
        ...state,
        error: payload.err,
      };
    default:
      return state;
  }
};
