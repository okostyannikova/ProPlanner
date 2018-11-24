export const normalizeData = data =>
  data.map(task => ({
    id: task.id,
    name: task.attributes.title,
    checked: task.attributes.status === 'complete',
  }));
