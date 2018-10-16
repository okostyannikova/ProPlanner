import axios from 'axios';
import {
  loadGoalsStart,
  loadGoalsSuccess,
  loadGoalsFail,
  deleteGoalStart,
  deleteGoalSuccess,
  deleteGoalFail,
} from './actions';
import { normalizeData } from './utils';
import { getLastPageNumber } from '../utils';
import { apiURL } from '../../config';

const goalsURL = `${apiURL}/goals`;

const loadGoals = (number, size) => dispatch => {
  dispatch(loadGoalsStart());

  axios(goalsURL, { params: { 'page[number]': number, 'page[size]': size } })
    .then(res => {
      console.log(res.data.data);
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

export default {
  loadGoals,
  deleteGoal,
};
