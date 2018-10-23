export const cutText = (text, num) => (text.length > num ? `${text.slice(0, num + 1)}...` : text);

export const millisecToMinutes = ms => ms / 1000 / 60;
