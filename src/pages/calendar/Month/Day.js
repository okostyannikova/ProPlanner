import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Media from 'react-media';
import { Link } from 'react-router-dom';

const Day = ({ day, date, className, today, selectDay, selectedDay }) => {
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
      return (
        <Media query="(min-width: 769px)">
          {matches =>
            matches ? (
              <a className={getClassNames} onClick={handleClick} data-qa={date}>
                {dayBody()}
              </a>
            ) : (
              <Link
                to="/calendar/day"
                className={getClassNames}
                onClick={handleClick}
                data-qa={date}
              >
                {dayBody()}
              </Link>
            )
          }
        </Media>
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
