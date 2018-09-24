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

export const normalizeSingleData = data => ({
  id: data.id,
  attributes: {
    ...data.attributes,
    'start-date': moment(data.attributes['start-date']).utc(),
    'end-date': moment(data.attributes['end-date']).utc(),
  },
});

export const normalizePatchData = data => ({
  data: {
    attributes: {
      title: data.title || 'UpdatedEve',
      description: data.description || 'Test Event',
      location: data.location || 'Dreamland',
      priority: data.priority.toLowerCase() || 'low',
      start_date: data.start_date || '2018-08-30T13:05:17+03:00',
      end_date: data.end_date || '2018-08-30T13:05:17+03:00',
    },
  },
});

export const normalizeCreateData = data => ({
  data: {
    type: 'events',
    attributes: {
      title: data.title || 'Some Great Event',
      description: data.description || 'Super detailed description',
      location: data.location || 'Dreamland',
      priority: data.priority || 'low',
      start_date: data.start_date || '2018-08-30T13:05:17+03:00',
      end_date: data.end_date || '2018-08-30T13:05:17+03:00',
      event_type: data.type || 'work',
    },
  },
});
