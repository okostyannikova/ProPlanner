const initialDate = {
  listOfMonthLabels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  currentMounth: new Date().getMonth(),
  currentYear: new Date().getFullYear(),
};

export default (monthlyCalendar = initialDate, action) => {
  const { type } = action;
  return monthlyCalendar;
};
