import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withWindowWidth } from 'components/hocs/window-context';
import { Link } from 'react-router-dom';

const Day = ({ day, date, className, today, selectDay, selectedDay, windowWidth }) => {
  const handleClick = ev => {
    selectDay(date);
  };

  const getClassNames = classNames({
    today,
    'month__day--active': date && date === selectedDay,
  });

  const dayBody = () => <span className="month__day-item">{day}</span>;

  const getDay = () => {
    if (date) {
      return windowWidth > 768 ? (
        <a className={getClassNames} onClick={handleClick} data-qa={date}>
          {dayBody()}
        </a>
      ) : (
        <Link to="/calendar/day" className={getClassNames} onClick={handleClick} data-qa={date}>
          {dayBody()}
        </Link>
      );
    }
    return dayBody();
  };

  return <td className={`month__day ${className}`}>{getDay()} </td>;
};

Day.initialState = {
  date: null,
};

Day.propTypes = {
  day: PropTypes.string.isRequired,
  date: PropTypes.string,
  className: PropTypes.string,
  today: PropTypes.bool,
  selected: PropTypes.string,
};

export default withWindowWidth(Day);
