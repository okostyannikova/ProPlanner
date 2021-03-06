import types from './types';

const initialState = {
  loading: false,
  deleting: false,
  goalsList: [],
  goalsSingleGoal: null,
  error: null,
  lastPageNumber: 1,
  search: null,
  selectedEvents: null,
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

    case types.DELETE_GOAL_START:
      return {
        ...state,
        deleting: true,
      };
    case types.DELETE_GOAL_SUCCESS:
      return {
        ...state,
        error: null,
        goalsList: state.goalsList.filter(goal => goal.id !== payload.id),
        deleting: false,
      };
    case types.DELETE_GOAL_FAIL:
      return {
        ...state,
        deleting: false,
        error,
      };
    case types.RESTORE_GOALS_STATE:
      return {
        ...state,
        goalsList: [],
      };

    case types.LOAD_SINGLE_GOAL_START:
      return {
        ...state,
        loading: true,
      };
    case types.LOAD_SINGLE_GOAL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        goalsSingleGoal: payload.goal,
      };
    case types.LOAD_SINGLE_GOAL_FAIL:
      return {
        ...state,
        loading: false,
        error,
      };

    case types.REMOVE_SINGLE_GOAL:
      return {
        ...state,
        loading: false,
        goalsSingleGoal: null,
      };

    case types.UPDATE_SINGLE_GOAL_START:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_SINGLE_GOAL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.UPDATE_SINGLE_GOAL_FAIL:
      return {
        ...state,
        loading: false,
        error,
      };

    case types.CREATE_SINGLE_GOAL_START:
      return {
        ...state,
        loading: true,
      };
    case types.CREATE_SINGLE_GOAL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        goalsSingleGoal: payload.res,
        goalsList: [payload.goal, ...state.goalsList],
      };
    case types.CREATE_SINGLE_GOAL_FAIL:
      return {
        ...state,
        loading: false,
        error,
      };
    case types.SEARCH_GOALS:
      return {
        ...state,
        search: payload.search,
      };

    case types.SHOW_SELECTED_EVENTS_START:
      return {
        ...state,
      };

    case types.SHOW_SELECTED_EVENTS_SUCCES:
      return {
        ...state,
        selectedEvents: payload.data,
      };
    case types.SHOW_SELECTED_EVENTS_FAIL:
      return {
        ...state,
        error,
      };

    case types.REMOVE_SELECTED_EVENTS:
      return {
        ...state,
        selectedEvents: null,
      };

    default:
      return state;
  }
};
