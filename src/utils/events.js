import { millisecToMinutes } from './helpers';

export const getDaySummary = events => {
  const summary = {};
  events.forEach(ev => {
    const { 'start-date': start, 'end-date': end, 'event-type': type } = ev.attributes;
    const eventLength = millisecToMinutes(end - start);
    if (summary[type]) {
      summary[type] += eventLength;
    } else {
      summary[type] = eventLength;
    }
  });
  return summary;
};

export const getEvents = (day, events) => {
  if (events) {
    const today = day.format('YYYY-MM-DD');
    return events.filter(ev => {
      const eventDay = ev.attributes['start-date'].clone().format('YYYY-MM-DD');
      return today === eventDay;
    });
  }
  return [];
};
