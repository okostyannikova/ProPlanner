export const getLastPageNumber = url =>
  Number(url.match(/page%5Bnumber%5D=\d+/i)[0].match(/\d+$/i)[0]);
