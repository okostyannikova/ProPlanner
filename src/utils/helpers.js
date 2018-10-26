export const cutText = (text, num) => (text.length > num ? `${text.slice(0, num + 1)}...` : text);

export const millisecToMinutes = ms => ms / 1000 / 60;

export const convertToFilterOptions = (key, options) =>
  Object.keys(options).map((el, i) => ({
    value: { [key]: i },
    label: `${el[0].toUpperCase() + el.slice(1)}`,
  }));
export const minutesToCivilTime = minutes => `${Math.floor(minutes / 60)}:${minutes % 60}`;
