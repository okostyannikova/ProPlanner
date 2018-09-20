import types from './types';

const initialState = {
  loading: false,
  goalsList: null,
  error: null,
};

export default (state = initialState, action) => {
  const { type, payload, error } = action;

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
        error: null,
        goalsList: payload.goals,
      };
    case types.LOAD_GOALS_FAIL:
      return {
        ...state,
        error,
      };

    case types.DELETE_GOAL_SUCCESS:
      return {
        ...state,
        error: null,
        goalsList: state.goalsList.filter(goal => goal.id !== payload.id),
      };
    case types.DELETE_GOAL_FAIL:
      return {
        ...state,
        error,
      };
    default:
      return state;
  }
};
