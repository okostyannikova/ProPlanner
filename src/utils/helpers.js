export const cutText = (text, num) => (text.length > num ? `${text.slice(0, num + 1)}...` : text);

export const millisecToMinutes = ms => ms / 1000 / 60;

export const minutesToСivilTime = minutes => `${Math.floor(minutes / 60)}:${minutes % 60}`;
