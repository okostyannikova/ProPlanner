import moment from 'moment';

const NEXT_MONTH = 'NEXT_MONTH';
const PREV_MONTH = 'PREV_MONTH';
const NEXT_WEEK = 'NEXT_WEEK';
const PREV_WEEK = 'PREV_WEEK';
const SELECT_DAY = 'SELECT_DAY';

const initialDate = {
  listOfMonthLabels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  currentMounth: new Date().getMonth(),
  currentYear: new Date().getFullYear(),
  selectedDay: moment(),
  firstWeekDay: moment().startOf('isoWeek'),
};

export const prevMonth = () => ({ type: PREV_MONTH });

export const nextMonth = () => ({ type: NEXT_MONTH });

export const prevWeek = () => ({ type: PREV_WEEK });

export const nextWeek = () => ({ type: NEXT_WEEK });

export const selectDay = day => ({ type: SELECT_DAY, payload: { day } });

export default (monthlyCalendar = initialDate, action) => {
  const { type, payload } = action;
  const { currentMounth, currentYear, firstWeekDay } = monthlyCalendar;
  switch (type) {
    case PREV_MONTH:
      if (monthlyCalendar.currentMounth === 0) {
        return {
          ...monthlyCalendar,
          currentYear: currentYear - 1,
          currentMounth: 11,
        };
      }
      return {
        ...monthlyCalendar,
        currentMounth: currentMounth - 1,
      };
    case NEXT_MONTH:
      if (monthlyCalendar.currentMounth === 11) {
        return {
          ...monthlyCalendar,
          currentYear: currentYear + 1,
          currentMounth: 0,
        };
      }
      return {
        ...monthlyCalendar,
        currentMounth: currentMounth + 1,
      };
    case PREV_WEEK:
      return {
        ...monthlyCalendar,
        firstWeekDay: firstWeekDay
          .clone()
          .add('-1', 'day')
          .startOf('isoWeek'),
      };
    case NEXT_WEEK:
      return {
        ...monthlyCalendar,
        firstWeekDay: firstWeekDay
          .clone()
          .add('8', 'day')
          .startOf('isoWeek'),
      };
    case SELECT_DAY:
      return {
        ...monthlyCalendar,
        selectedDay: moment(payload.day, 'YYYY-M-D'),
        firstWeekDay: moment(payload.day, 'YYYY-M-D').startOf('isoWeek'),
      };
    default:
      return monthlyCalendar;
  }
};
