import types from './types';

const initialState = {
  loading: false,
  deleting: false,
  tasksList: [],
  error: null,
};

export default (state = initialState, action) => {
  const { type, payload, error } = action;
  const { tasksList } = state;

  switch (type) {
    case types.LOAD_TASKS_START:
      return {
        ...state,
        loading: true,
      };
    case types.LOAD_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        tasksList: [...tasksList, ...payload.tasks],
      };
    case types.LOAD_TASKS_FAIL:
      return {
        ...state,
        loading: false,
        error,
      };

    case types.CREATE_TASK_START:
      return {
        ...state,
        loading: true,
      };
    case types.CREATE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        tasksList: [...tasksList, payload.task],
      };
    case types.CREATE_TASK_FAIL:
      return {
        ...state,
        loading: false,
        error,
      };

    case types.DELETE_TASK_START:
      return {
        ...state,
        deleting: true,
      };
    case types.DELETE_TASK_SUCCESS:
      return {
        ...state,
        deleting: false,
        error: null,
        tasksList: state.tasksList.filter(task => task.id !== payload.data),
      };
    case types.DELETE_TASK_FAIL:
      return {
        ...state,
        deleting: false,
        error,
      };

    case types.UNLOAD_ALL_TASKS:
      return {
        ...state,
        loading: false,
        tasksList: [],
      };

    default:
      return state;
  }
};
