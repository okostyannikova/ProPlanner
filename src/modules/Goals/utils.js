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

export const normalizeSingleData = data => ({
  id: data.id,
  attributes: {
    ...data.attributes,
    'start-date': moment(data.attributes['start-date']),
    'end-date': moment(data.attributes['end-date']),
  },
  events: data.relationships.events.data,
});

export const normalizePatchData = data => ({
  data: {
    type: 'goals',
    attributes: {
      title: data.title || 'Bionic',
      description: data.description || 'beaver',
      picture: data.picture || '',
      start_date: data.startTime || moment(),
      end_date: data.endTime || moment(),
      goal_type: data.type.toLowerCase() || 'work',
      s: data.specific || 'monkey',
      m: data.measurable || 'crazy',
      a: data.achievable || 'step',
      r: data.relevant || 'to stars',
      t: data.timeFramed || 'banannas',
    },
  },
});

export const normalizeCreateData = data => ({
  data: {
    type: 'goals',
    attributes: {
      title: data.title || 'Bionic',
      description: data.description || 'beaver',
      picture: data.picture || '',
      start_date: data.startTime || moment(),
      end_date:
        data.endTime ||
        moment()
          .add(10, 'seconds')
          .format(),
      goal_type: data.type.toLowerCase() || 'work',
      s: data.specific || 'monkey',
      m: data.measurable || 'crazy',
      a: data.achievable || 'step',
      r: data.relevant || 'to stars',
      t: data.timeFramed || 'banannas',
    },
  },
});
