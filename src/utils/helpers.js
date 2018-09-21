export const cutDescription = description =>
  description.length > 50 ? `${description.slice(0, 51)}...` : description;
