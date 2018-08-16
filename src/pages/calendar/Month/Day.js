import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const activeStyle = {
  color: '#fff',
  backgroundColor: '#3366B4',
};

const Day = ({ day, date, className, today, match, selectDay }) => {
  const handleClick = () => selectDay(date);
  const dayBody = () => (
    <span className="month__day-item">{day && day < 10 ? `0${day} ` : day}</span>
  );

  const getDay = () => {
    if (date) {
      return (
        <NavLink
          to={`${match.url}/${date}`}
          activeStyle={activeStyle}
          className={today ? 'today' : ''}
          onClick={handleClick}
        >
          {dayBody()}
        </NavLink>
      );
    }
    return dayBody();
  };

  return <td className={`month__day ${className}`}>{getDay()} </td>;
};

Day.propTypes = {
  day: PropTypes.number.isRequired,
  className: PropTypes.string,
  today: PropTypes.bool,
  selected: PropTypes.string
};

export default Day;
