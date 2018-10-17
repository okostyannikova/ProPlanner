import * as moment from 'moment';

export const required = value => (value ? undefined : 'Value is required');

export const maxTitleLength = value =>
  value.length > 50 ? 'Value is too long (Max 50 symbols)' : undefined;

export const maxDescriptionLength = value =>
  value.length > 255 ? 'Value is too long (Max 255 symbols)' : undefined;

export const timeValidation = (value, allValues) =>
  moment(value).diff(moment(allValues.startTime), 'minutes') < 30
    ? 'Minimum distance between start time/end time must be 30 minutes'
    : undefined;
