export const cutText = (text, num) => (text.length > num ? `${text.slice(0, num + 1)}...` : text);

export const millisecToMinutes = ms => ms / 1000 / 60;

export const minutesToCivilTime = minutes => `${Math.floor(minutes / 60)}:${minutes % 60}`;

export const convertToFilterOptions = (type, key, options) =>
  Object.keys(options).map((el, i) => ({
    group: type,
    value: { [key]: i },
    label: `${el[0].toUpperCase() + el.slice(1)}`,
  }));

export const getTextColor = bgColor => {
  if (bgColor.indexOf('rgb') === -1) throw new Error('Color must be in "rgb" format!');
  const rgb = bgColor.match(/\d+/g);
  const mainTextColor = '#4278bb';
  const lightTextColor = '#fff';
  const o = Math.round(
    (parseInt(rgb[0], 10) * 299 + parseInt(rgb[1], 10) * 587 + parseInt(rgb[2], 10) * 114) / 1000
  );
  if (o > 145) {
    return mainTextColor;
  }
  return lightTextColor;
};
