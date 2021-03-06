import moment from 'moment';

export const normalizeData = data =>
  data.map(ev => ({
    id: ev.id,
    attributes: {
      ...ev.attributes,
      'event-type': ev.attributes['event-type'] || 'google',
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

export const normalizePatchData = data => {
  const tasksArray = data.tasks.map(task => {
    const tasks = task.id
      ? {
          id: task.id,
          title: task.name,
          status: task.checked === true ? 2 : 0,
        }
      : {
          title: task.name,
          status: task.checked === true ? 2 : 0,
        };

    return tasks;
  });

  const goalId = data.select ? data.select[0].value : null;

  return {
    data: {
      attributes: {
        title: data.title || 'UpdatedEvent',
        description: data.description || '',
        location: data.location || 'Dreamland',
        priority: data.priority.toLowerCase() || 'low',
        event_type: data.type.toLowerCase() || 'work',
        start_date: data.startTime || moment(),
        end_date: data.endTime || moment(),
        goal_id: goalId,
      },
      relationships: {
        task: {
          data: tasksArray,
        },
      },
    },
  };
};

export const normalizeCreateData = data => {
  const tasksArray = data.tasks.map(task => {
    const tasks = task.id
      ? {
          id: task.id,
          title: task.name,
          status: task.checked === true ? 2 : 0,
        }
      : {
          title: task.name,
          status: task.checked === true ? 2 : 0,
        };

    return tasks;
  });

  const goalId = data.select ? data.select[0].value : null;

  return {
    data: {
      type: 'events',
      attributes: {
        title: data.title || 'Some Great Event',
        description: data.description || '',
        location: data.location || 'Dreamland',
        priority: data.priority ? data.priority.toLowerCase() : 'normal',
        start_date: data.startTime || moment().format(),
        end_date:
          data.endTime ||
          moment()
            .add(10, 'seconds')
            .format(),
        event_type: data.type.toLowerCase() || 'work',
        goal_id: goalId,
      },
      relationships: {
        task: {
          data: tasksArray,
        },
      },
    },
  };
};

export const convertFilter = filters =>
  filters.reduce((prev, item) => ({ ...prev, ...item.value }), {});

export const notificationSync = {
  title: 'Synchronization successful.',
  message: 'It may takes some time to deliver new events from Google Calendar to ProPlanner.',
  position: 'br',
  autoDismiss: 15,
  dismissible: false,
  action: {
    label: 'GOT IT',
  },
};
