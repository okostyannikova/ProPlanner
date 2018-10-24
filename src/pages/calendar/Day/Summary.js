import React from 'react';
import PropTypes from 'prop-types';

const Summary = ({ evenst }) => {
  console.log(evenst);
  return <div className="calendar-day__summary" />;
};

Summary.defaultProps = {
  evenst: [],
};
Summary.propTypes = {
  evenst: PropTypes.array,
};

export default Summary;
