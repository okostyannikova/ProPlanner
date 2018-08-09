import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const DaySidebar = ({ match }) => (
  <div className="day-sidebar">
    <span>{match.params.day}</span>
  </div>
);

DaySidebar.propTypes = {
  match: PropTypes.object.isRequired,
};

export default DaySidebar;
