import { NEXT_MONTH, PREV_MONTH } from './constants';

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
};

export const prevMonth = () => ({ type: PREV_MONTH });

export const nextMonth = () => ({ type: NEXT_MONTH });

export default (monthlyCalendar = initialDate, action) => {
  const { type } = action;
  const { currentMounth, currentYear } = monthlyCalendar;
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
    default:
      return monthlyCalendar;
  }
};
