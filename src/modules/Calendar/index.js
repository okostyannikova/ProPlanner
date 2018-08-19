import moment from 'moment';

const NEXT_MONTH = 'NEXT_MONTH';
const PREV_MONTH = 'PREV_MONTH';
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
};

export const prevMonth = () => ({ type: PREV_MONTH });

export const nextMonth = () => ({ type: NEXT_MONTH });

export const selectDay = day => ({ type: SELECT_DAY, payload: { day } });

export default (monthlyCalendar = initialDate, action) => {
  const { type, payload } = action;
  const { currentMounth, currentYear, selectedDay } = monthlyCalendar;
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
    case SELECT_DAY:
      console.log(selectedDay);
      return { ...monthlyCalendar, selectedDay: moment(payload.day, 'YYYY-M-D') };
    default:
      return monthlyCalendar;
  }
};
