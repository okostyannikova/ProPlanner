import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withWindowWidth } from 'components/hocs/window-context';
import { Link } from 'react-router-dom';
import Summary from './Summary';

const Day = ({
  day,
  date,
  className,
  today,
  selectDay,
  selectedDay,
  windowWidth,
  events,
  workingTime,
}) => {
  const handleClick = () => {
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
        <span className="month__day-wrapper" onClick={handleClick} data-qa={date}>         {/* eslint-disable-line */}
          <Summary events={events} workingTime={workingTime} />
          <a className={`${getClassNames} month__day-link`}>{dayBody()}</a>
        </span>
      ) : (
        <Link to="/calendar/day" className="month__day-wrapper" onClick={handleClick} data-qa={date}>         {/* eslint-disable-line */}
          <Summary events={events} workingTime={workingTime} />
          <span className={`${getClassNames} month__day-link`}>{dayBody()}</span>
        </Link>
      );
    }
    return dayBody();
  };

  return <td className={`month__day ${className}`}>{getDay()} </td>;
};

Day.defaultProps = {
  date: null,
  today: null,
  className: '',
  selectDay: null,
  selectedDay: null,
  events: [],
  workingTime: null,
};

Day.propTypes = {
  events: PropTypes.array,
  day: PropTypes.string.isRequired,
  date: PropTypes.string,
  className: PropTypes.string,
  today: PropTypes.bool,
  selectDay: PropTypes.func,
  selectedDay: PropTypes.string,
  windowWidth: PropTypes.number.isRequired,
  workingTime: PropTypes.number,
};

export default withWindowWidth(Day);
