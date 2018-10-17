import types from './types';

const initialState = {
  loading: false,
  goalsList: [],
  error: null,
  lastPageNumber: 1,
};

export default (state = initialState, action) => {
  const { type, payload, error } = action;
  const { goalsList } = state;

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
        goalsList: [...goalsList, ...payload.goals],
        lastPageNumber: payload.lastPageNumber,
      };
    case types.LOAD_GOALS_FAIL:
      return {
        ...state,
        loading: false,
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
    case types.RESTORE_GOALS_STATE:
      return {
        ...state,
        eventsList: [],
      };
    default:
      return state;
  }
};
