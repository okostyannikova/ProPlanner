import moment from 'moment';
import deepFreeze from 'deep-freeze';
import calendarReducer, {
  NEXT_MONTH,
  PREV_MONTH,
  NEXT_WEEK,
  PREV_WEEK,
  NEXT_DAY,
  PREV_DAY,
  SELECT_DAY,
  RESTORE_CALENDAR,
} from '../Calendar';

describe('calendar Reducer', () => {
  const state = {
    currentDate: moment(),
    selectedDay: moment(),
    firstWeekDay: moment().startOf('isoWeek'),
  };
  const { currentDate, firstWeekDay, selectedDay } = state;
  deepFreeze(state);

  it('PREV MONTH success', () => {
    const action = { type: PREV_MONTH };
    const results = calendarReducer(state, action);
    expect(results).toEqual({ ...state, currentDate: currentDate.clone().add(-1, 'month') });
  });

  it('NEXT MONTH success', () => {
    const action = { type: NEXT_MONTH };
    const result = calendarReducer(state, action);
    expect(result).toEqual({ ...state, currentDate: currentDate.clone().add(1, 'month') });
    expect(result).toEqual({ ...state, currentDate: currentDate.clone().add(1, 'month') });
  });

  it('PREV WEEK success', () => {
    const action = { type: PREV_WEEK };
    const result = calendarReducer(state, action);
    expect(result).toEqual({
      ...state,
      firstWeekDay: firstWeekDay
        .clone()
        .add(-1, 'day')
        .startOf('isoWeek'),
    });
  });

  it('NEXT WEEK success', () => {
    const action = { type: NEXT_WEEK };
    const result = calendarReducer(state, action);
    expect(result).toEqual({
      ...state,
      firstWeekDay: firstWeekDay
        .clone()
        .add(8, 'day')
        .startOf('isoWeek'),
    });
  });

  it('PREV_DAY success', () => {
    const action = { type: PREV_DAY };
    const result = calendarReducer(state, action);
    expect(result).toEqual({
      ...state,
      selectedDay: selectedDay.clone().add(-1, 'day'),
      firstWeekDay: selectedDay
        .clone()
        .add(-1, 'day')
        .startOf('isoWeek'),
      currentDate: selectedDay.clone().add(-1, 'day'),
    });
  });

  it('NEXT_DAY success', () => {
    const action = { type: NEXT_DAY };
    const result = calendarReducer(state, action);
    expect(result).toEqual({
      ...state,
      selectedDay: selectedDay.clone().add(1, 'day'),
      firstWeekDay: selectedDay
        .clone()
        .add(1, 'day')
        .startOf('isoWeek'),
      currentDate: selectedDay.clone().add(1, 'day'),
    });
  });

  it('SELECT DAY success', () => {
    const action = {
      type: SELECT_DAY,
      payload: { day: moment('2018-10-02') },
    };
    deepFreeze(action);
    const { payload } = action;
    const result = calendarReducer(state, action);

    expect(result).toEqual({
      ...state,
      selectedDay: moment(payload.day, 'YYYY-M-D'),
      firstWeekDay: moment(payload.day, 'YYYY-M-D').startOf('isoWeek'),
      currentDate: moment(payload.day, 'YYYY-M-D'),
    });
  });

  it('RESTORE CALENDAR success', () => {
    const action = { type: RESTORE_CALENDAR };
    const result = calendarReducer(state, action);
    expect(result).toEqual({ ...state });
  });
});
