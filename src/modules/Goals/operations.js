import axios from 'axios';
import {
  loadGoalsStart,
  loadGoalsSuccess,
  loadGoalsFail,
  deleteGoalStart,
  deleteGoalSuccess,
  deleteGoalFail,
  restoreGoalsState,
  loadSingleGoalStart,
  loadSingleGoalSuccess,
  loadSingleGoalFail,
  removeSingleGoal,
  updateGoalStart,
  updateGoalSuccess,
  updateGoalFail,
  createGoalStart,
  createGoalSuccess,
  createGoalFail,
  seacrhGoals,
  showSelectedEventsStart,
  showSelectedEventsSuccess,
  showSelectedEventsFail,
  removeSelectedEvents,
} from './actions';
import {
  normalizeData,
  normalizeSingleData,
  normalizePatchData,
  normalizeCreateData,
  normalizeSelectedData,
  normalizeShowingData,
} from './utils';
import { getLastPageNumber } from '../utils';
import { apiURL } from '../../config';

const goalsURL = `${apiURL}/goals`;
const selectedEventsURL = `${apiURL}/events/show_many`;

const loadGoals = (number = 1, size = 15, filter, search = null) => dispatch => {
  dispatch(loadGoalsStart());

  axios(goalsURL, {
    params: {
      attribute: 'start_date',
      order: 'DESC',
      'page[number]': number,
      'page[size]': size,
      'q[title]': search,
    },
  })
    .then(res => {
      const goals = normalizeData(res.data.data);
      const lastPageNumber = getLastPageNumber(res.data.links.last);
      dispatch(loadGoalsSuccess(goals, lastPageNumber));
    })
    .catch(error => {
      dispatch(loadGoalsFail(error));
      throw new Error(error);
    });
};

const deleteGoal = id => dispatch => {
  dispatch(deleteGoalStart());

  axios
    .delete(`${goalsURL}/${id}`)
    .then(res => {
      if (res.status === 204) dispatch(deleteGoalSuccess(id));
    })
    .catch(error => {
      dispatch(deleteGoalFail(error));
      throw new Error(error);
    });
};

const restoreGoals = () => dispatch => dispatch(restoreGoalsState());

const loadSingleGoal = id => dispatch => {
  dispatch(loadSingleGoalStart());

  axios(`${goalsURL}/${id}`)
    .then(res => {
      const goal = normalizeSingleData(res.data.data);
      dispatch(loadSingleGoalSuccess(goal));
    })
    .catch(error => {
      dispatch(loadSingleGoalFail(error));
      // throw new Error(error);
    });
};

const deleteSingleGoal = () => dispatch => {
  dispatch(removeSingleGoal());
};

const patchGoal = (data, id) => dispatch => {
  const normalizedData = normalizePatchData(data);
  dispatch(updateGoalStart());

  axios
    .patch(`${goalsURL}/${id}`, normalizedData)
    .then(res => {
      dispatch(updateGoalSuccess(res));
    })
    .catch(error => {
      dispatch(updateGoalFail(error));
      // throw new Error(error);
    });
};

const addGoal = data => dispatch => {
  const normalizedData = normalizeCreateData(data);
  dispatch(createGoalStart());

  axios
    .post(`${goalsURL}/assigned`, normalizedData)
    .then(res => {
      const goal = normalizeSingleData(res.data.data);
      dispatch(createGoalSuccess(goal));
    })
    .catch(error => {
      console.log(error);
      dispatch(createGoalFail(error));
      // throw new Error(error);
    });
};

const setSearch = value => dispatch => dispatch(seacrhGoals(value));

const showSelectedEvents = data => dispatch => {
  const normalizedData = normalizeSelectedData(data);
  dispatch(showSelectedEventsStart());

  axios
    .post(`${selectedEventsURL}`, normalizedData)
    .then(res => {
      const normalizedShowingData = normalizeShowingData(res.data);
      dispatch(showSelectedEventsSuccess(normalizedShowingData));
    })
    .catch(error => {
      dispatch(showSelectedEventsFail(error));
    });
};

const deleteSelectedEvents = () => dispatch => {
  dispatch(removeSelectedEvents());
};

export default {
  loadGoals,
  deleteGoal,
  restoreGoals,
  loadSingleGoal,
  deleteSingleGoal,
  patchGoal,
  addGoal,
  setSearch,
  showSelectedEvents,
  deleteSelectedEvents,
};
