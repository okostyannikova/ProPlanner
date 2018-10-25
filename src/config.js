export const apiURL = 'http://backend.proplanner.formula1.cloud.provectus-it.com';

export const colorTypes = {
  work: '#FFBFD4',
  personal: '#FFE07F',
  entertainment: '#AD67CD',
  other: '#A9EFEA',
  google: '#F86256',
};

export const priorityOptions = {
  important: { color: '#F68181' },
  high: { color: '#fCDE75' },
  normal: { color: '#64C37D' },
  low: { color: '#00BCD4', direction: 180 },
};

export const smartOptions = {
  s: { color: '#3366B4', decs: 'Specific' },
  m: { color: '#FC85FE', decs: 'Measurable' },
  a: { color: '#FFE07F', decs: 'Achievable' },
  r: { color: '#A9EFEA', decs: 'Relevant' },
  t: { color: '#6A2789', decs: 'Time-Framed' },
};

export const workTimeStart = 8;
export const workTimeEnd = 21;
export const workingTime = (workTimeEnd - workTimeStart) * 60;
