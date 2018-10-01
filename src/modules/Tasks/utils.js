export const normalizeData = data =>
  data.map(task => ({
    id: task.id,
    ...task.attributes,
  }));
