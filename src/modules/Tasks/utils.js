export const normalizeData = data =>
  data.map(task => ({
    id: task.id,
    ...task.attributes,
  }));

export const normalizeSingleData = data => ({
  id: data.id,
  ...data.attributes,
});

export const normalizeCreateData = data => ({
  data: {
    type: 'tasks',
    attributes: {
      title: data || 'I forgot this title :)',
      status: 0,
    },
  },
});

export const normalizeUpdateData = data => ({
  data: {
    type: 'tasks',
    attributes: {
      title: data.name || 'I forgot this title :)',
      status: data.status,
    },
  },
});
