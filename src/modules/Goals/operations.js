import axios from 'axios';
import {
  loadGoalsStart,
  loadGoalsSuccess,
  loadGoalsFail,
  deleteGoalStart,
  deleteGoalSuccess,
  deleteGoalFail,
} from './actions';
import { apiURL } from '../../config';

const goalsURL = `${apiURL}/goals`;

const fakeGoals = [
  {
    id: '680a75d7-ec01-422d-84d2-0eea87ba0ea5',
    attributes: {
      title: 'Learn English',
      'picture-link': 'https://kor.ill.in.ua/m/610x385/2188836.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      'goal-type': 'personal',
      'start-date': '2018-09-18T17:00:00.000Z',
      'end-date': '2018-09-18T18:00:00.000Z',
      s: 'text',
      m: 'text',
      a: 'text',
      r: 'text',
      t: 'text',
    },
  },
  {
    id: '755a75d7-ec01-422d-84d2-0eea87ba0ea5',
    attributes: {
      title: 'To Get Promoted',
      'picture-link':
        'http://acroven.com/wp-content/uploads/2016/05/0e09527b0f5edaa60cf5702119e6a0a2_XL.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      'goal-type': 'work',
      'start-date': '2018-09-18T17:00:00.000Z',
      'end-date': '2018-09-18T18:00:00.000Z',
      s: 'text',
      m: 'text',
      a: '',
      r: 'text',
      t: '',
    },
  },
  {
    id: '123a75d7-ec01-422d-84d2-0eea87ba0ea5',
    attributes: {
      title: 'Buy an apartment',
      'picture-link':
        'https://vsenovostroyki.com.ua/upload/resize_cache/iblock/c2f/736_360_1/c2f0e42f531d0a4dfff84d94043141a9.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      'goal-type': 'personal',
      'start-date': '2018-09-18T17:00:00.000Z',
      'end-date': '2018-09-18T18:00:00.000Z',
      s: 'text',
      m: 'text',
      a: 'text',
      r: 'text',
      t: 'text',
    },
  },
  {
    id: '125a75d7-ec01-422d-84d2-0eea87ba0ea5',
    attributes: {
      title: 'Run the marathon',
      'picture-link':
        'https://rostovgazeta.ru/attachments/8d72ce79ca5e9e92391eadadce4e243973ec0fb0/store/fill/780/440/9758b41178157d321ef91e0eb1551ced67fe2c52a20d62dd401ab0721d1b/marafon-v-finlandii_1.jpg',
      description: '',
      'goal-type': 'other',
      'start-date': '2018-09-18T17:00:00.000Z',
      'end-date': '2018-09-18T18:00:00.000Z',
      s: '',
      m: 'text',
      a: 'text',
      r: '',
      t: 'text',
    },
  },
  {
    id: '742a75d7-ec01-422d-84d2-0eea87ba0ea5',
    attributes: {
      title: 'To Get Promoted',
      'picture-link': '',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      'goal-type': 'work',
      'start-date': '2018-09-18T17:00:00.000Z',
      'end-date': '2018-09-18T18:00:00.000Z',
      s: 'text',
      m: 'text',
      a: '',
      r: 'text',
      t: '',
    },
  },
];

const loadGoals = () => dispatch => {
  dispatch(loadGoalsStart());

  Promise.resolve(fakeGoals)
    .then(res => {
      dispatch(loadGoalsSuccess(res));
    })
    .catch(error => {
      dispatch(loadGoalsFail(error));
      throw new Error(error);
    });
};

const deleteGoal = id => dispatch => {
  dispatch(deleteGoalStart());

  Promise.resolve(id)
    .then(res => {
      dispatch(deleteGoalSuccess(res));
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
