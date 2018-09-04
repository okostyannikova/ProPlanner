import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Day = ({ day, date, className, today, selectDay, selectedDay }) => {
  const handleClick = ev => {
    ev.preventDefault();
    selectDay(date);
  };
  const getClassNames = classNames({
    today,
    'month__day--active': date && date === selectedDay,
  });

  const dayBody = () => <span className="month__day-item">{day}</span>;

  const getDay = () => {
    if (date) {
      return (
        <a className={getClassNames} onClick={handleClick}>
          {dayBody()}
        </a>
      );
    }
    return dayBody();
  };

  return <td className={`month__day ${className}`}>{getDay()} </td>;
};

Day.propTypes = {
  day: PropTypes.string.isRequired,
  className: PropTypes.string,
  today: PropTypes.bool,
  selected: PropTypes.string,
};

export default Day;
