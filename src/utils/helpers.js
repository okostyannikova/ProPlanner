export const cutText = (text, num) => (text.length > num ? `${text.slice(0, num + 1)}...` : text);
