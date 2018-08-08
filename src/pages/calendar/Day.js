import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const Day = ({ date, className }) => (
  <td className={className}>{date && date < 10 ? `0${date}` : date}</td>
);

Day.propTypes = {
  date: PropTypes.number,
};

export default Day;
