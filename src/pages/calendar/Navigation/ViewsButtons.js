import React from 'react';
import { NavLink } from 'react-router-dom';

const activeStyle = {
  position: 'relative',
  zIndex: '20',
  color: '#00BCD4',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: '#FFF',
  boxShadow: '0 8px 8px rgba(0, 188, 212, 0.09)',
};

const ViewsButtons = () => (
  <ul className="views-btn-list">
    <li>
      <NavLink
        to="/calendar/week"
        activeStyle={activeStyle}
        className="calendar-nav__views-btn"
        id="week-btn"
      >
        Week
      </NavLink>
      <NavLink
        to="/calendar/month"
        activeStyle={activeStyle}
        className="calendar-nav__views-btn"
        id="month-btn"
      >
        Month
      </NavLink>
      <NavLink
        to="/calendar/day"
        activeStyle={activeStyle}
        className="calendar-nav__views-btn"
        id="day-btn"
      >
        Day
      </NavLink>
    </li>
  </ul>
);

export default ViewsButtons;
