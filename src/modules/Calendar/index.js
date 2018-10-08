import moment from 'moment';

const NEXT_MONTH = 'NEXT_MONTH';
const PREV_MONTH = 'PREV_MONTH';
const NEXT_WEEK = 'NEXT_WEEK';
const PREV_WEEK = 'PREV_WEEK';
const NEXT_DAY = 'NEXT_DAY';
const PREV_DAY = 'PREV_DAY';
const SELECT_DAY = 'SELECT_DAY';

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

export default (calendar = initialDate, action) => {
  const { type, payload } = action;
  const { firstWeekDay, selectedDay, currentDate } = calendar;

  switch (type) {
    case PREV_MONTH:
      return {
        ...calendar,
        currentDate: selectedDay.clone().add(-1, 'month'),
      };
    case NEXT_MONTH:
      return {
        ...calendar,
        currentDate: selectedDay.clone().add(1, 'month'),
      };
    case PREV_WEEK:
      return {
        ...calendar,
        firstWeekDay: firstWeekDay
          .clone()
          .add(-1, 'day')
          .startOf('isoWeek'),
        currentDate: firstWeekDay
          .clone()
          .add(-1, 'day')
          .endOf('isoWeek'),
      };
    case NEXT_WEEK:
      return {
        ...calendar,
        firstWeekDay: firstWeekDay
          .clone()
          .add(8, 'day')
          .startOf('isoWeek'),
        currentDate: firstWeekDay
          .clone()
          .add(8, 'day')
          .endOf('isoWeek'),
      };
    case PREV_DAY:
      return {
        ...calendar,
        selectedDay: selectedDay.clone().add(-1, 'day'),
        firstWeekDay: selectedDay
          .clone()
          .add(-1, 'day')
          .startOf('isoWeek'),
        currentDate: selectedDay.clone(),
      };
    case NEXT_DAY:
      return {
        ...calendar,
        selectedDay: selectedDay.clone().add(1, 'day'),
        firstWeekDay: selectedDay
          .clone()
          .add(1, 'day')
          .startOf('isoWeek'),
        currentDate: selectedDay.clone(),
      };
    case SELECT_DAY:
      return {
        ...calendar,
        selectedDay: moment(payload.day, 'YYYY-M-D'),
        firstWeekDay: moment(payload.day, 'YYYY-M-D').startOf('isoWeek'),
      };
    default:
      return calendar;
  }
};
