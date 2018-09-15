import moment from 'moment';

export const normalizeData = data =>
  data.map(ev => ({
    id: ev.id,
    attributes: {
      ...ev.attributes,
      'start-date': moment(ev.attributes['start-date']).utc(),
      'end-date': moment(ev.attributes['end-date']).utc(),
    },
  }));
