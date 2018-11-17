import { convertToFilterOptions } from './utils/helpers';

export const apiURL = 'http://backend.proplanner.formula1.cloud.provectus-it.com';

export const typesOptions = {
  work: 'rgb(245,194,211)',
  personal: 'rgb(250,224,140)',
  entertainment: 'rgb(163,109,199)',
  other: 'rgb(184,237,233)',
  google: 'rgb(231,107,93)',
};

export const filtersTypesOptions = {
  work: '#FFBFD4',
  personal: '#FFE07F',
  entertainment: '#AD67CD',
  other: '#A9EFEA',
};

export const priorityOptions = {
  high: { color: '#F68181' },
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

export const filterOptions = [
  {
    label: 'Type',
    options: convertToFilterOptions('type', 'q[event_type]', filtersTypesOptions),
  },
  {
    label: 'Priority',
    options: convertToFilterOptions('priority', 'q[priority]', priorityOptions),
  },
];
