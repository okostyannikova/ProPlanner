import React from 'react';
import { NavLink } from 'react-router-dom';

const activeStyle = {
  position: 'relative',
  zIndex: '20',
  color: '#fff',
  border: '#00BCD4',
  backgroundColor: '#00BCD4',
  boxShadow: '0 8px 8px rgba(0, 188, 212, 0.09)',
};

const activeStyleCenter = {
  ...activeStyle,
  borderRadius: '5px',
};

const ViewsButtons = () => (
  <ul className="calendar-nav__views-btn-list">
    <li>
      <NavLink
        to="/calendar/week"
        activeStyle={activeStyle}
        className="calendar-nav__views-btn calendar-nav__views-btn--first"
        id="week-btn"
      >
        Week
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/calendar/month"
        activeStyle={activeStyleCenter}
        className="calendar-nav__views-btn"
        id="month-btn"
      >
        Month
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/calendar/day"
        activeStyle={activeStyle}
        className="calendar-nav__views-btn calendar-nav__views-btn--last"
        id="day-btn"
      >
        Day
      </NavLink>
    </li>
  </ul>
);

export default ViewsButtons;
