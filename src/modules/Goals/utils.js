import moment from 'moment';

export const normalizeData = data =>
  data.map(goal => ({
    id: goal.id,
    attributes: {
      ...goal.attributes,
      'start-date': moment(goal.attributes['start-date']),
      'end-date': moment(goal.attributes['end-date']),
    },
    events: goal.relationships.events.data,
  }));
