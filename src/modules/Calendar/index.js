import moment from 'moment';

export const NEXT_MONTH = 'NEXT_MONTH';
export const PREV_MONTH = 'PREV_MONTH';
export const NEXT_WEEK = 'NEXT_WEEK';
export const PREV_WEEK = 'PREV_WEEK';
export const NEXT_DAY = 'NEXT_DAY';
export const PREV_DAY = 'PREV_DAY';
export const SELECT_DAY = 'SELECT_DAY';
export const RESTORE_CALENDAR = 'RESTORE_CALENDAR';

const initialDate = {
  currentDate: moment(),
  selectedDay: moment(),
  firstWeekDay: moment().startOf('isoWeek'),
};

export const prevMonth = () => ({ type: PREV_MONTH });
export const nextMonth = () => ({ type: NEXT_MONTH });

export const prevWeek = () => ({ type: PREV_WEEK });
export const nextWeek = () => ({ type: NEXT_WEEK });

export const prevDay = () => ({ type: PREV_DAY });
export const nextDay = () => ({ type: NEXT_DAY });

export const selectDay = day => ({ type: SELECT_DAY, payload: { day } });
export const restoreCalendar = () => ({ type: RESTORE_CALENDAR });

export default (calendar = initialDate, action) => {
  const { type, payload } = action;
  const { firstWeekDay, selectedDay, currentDate } = calendar;

  switch (type) {
    case PREV_MONTH:
      return {
        ...calendar,
        currentDate: currentDate.clone().add(-1, 'month'),
      };
    case NEXT_MONTH:
      return {
        ...calendar,
        currentDate: currentDate.clone().add(1, 'month'),
      };
    case PREV_WEEK:
      return {
        ...calendar,
        firstWeekDay: firstWeekDay
          .clone()
          .add(-1, 'day')
          .startOf('isoWeek'),
      };
    case NEXT_WEEK:
      return {
        ...calendar,
        firstWeekDay: firstWeekDay
          .clone()
          .add(8, 'day')
          .startOf('isoWeek'),
      };
    case PREV_DAY:
      return {
        ...calendar,
        selectedDay: selectedDay.clone().add(-1, 'day'),
        firstWeekDay: selectedDay
          .clone()
          .add(-1, 'day')
          .startOf('isoWeek'),
        currentDate: selectedDay.clone().add(-1, 'day'),
      };
    case NEXT_DAY:
      return {
        ...calendar,
        selectedDay: selectedDay.clone().add(1, 'day'),
        firstWeekDay: selectedDay
          .clone()
          .add(1, 'day')
          .startOf('isoWeek'),
        currentDate: selectedDay.clone().add(1, 'day'),
      };
    case SELECT_DAY:
      return {
        ...calendar,
        selectedDay: moment(payload.day, 'YYYY-M-D'),
        firstWeekDay: moment(payload.day, 'YYYY-M-D').startOf('isoWeek'),
        currentDate: moment(payload.day, 'YYYY-M-D'),
      };
    case RESTORE_CALENDAR:
      return { ...initialDate };
    default:
      return calendar;
  }
};
