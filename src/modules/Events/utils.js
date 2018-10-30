import moment from 'moment';

export const normalizeData = data =>
  data.map(ev => ({
    id: ev.id,
    attributes: {
      ...ev.attributes,
      'start-date': moment(ev.attributes['start-date']),
      'end-date': moment(ev.attributes['end-date']),
    },
  }));

export const normalizeSingleData = data => ({
  id: data.id,
  attributes: {
    ...data.attributes,
    'start-date': moment(data.attributes['start-date']),
    'end-date': moment(data.attributes['end-date']),
  },
  tasks: data.relationships.tasks.data,
});

export const normalizePatchData = data => ({
  data: {
    attributes: {
      title: data.title || 'UpdatedEvent',
      description: data.description || 'Test Event',
      location: data.location || 'Dreamland',
      priority: data.priority.toLowerCase() || 'low',
      event_type: data.type.toLowerCase() || 'work',
      start_date: data.startTime || moment(),
      end_date: data.endTime || moment(),
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
      priority: data.priority ? data.priority.toLowerCase() : 'normal',
      start_date: data.startTime || moment().format(),
      end_date:
        data.endTime ||
        moment()
          .add(10, 'seconds')
          .format(),
      event_type: data.type.toLowerCase() || 'work',
    },
  },
});

export const convertFilter = filters =>
  filters.reduce((prev, item) => ({ ...prev, ...item.value }), {});
