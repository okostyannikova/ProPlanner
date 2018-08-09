import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const Navigation = ({ handlePrevDateClick, handleNextDateClick, currentMounth, currentYear }) => (
  <nav className="calendar-nav">
    <div className="calendar-nav__label">
      <button
        className="calendar-nav__prev-btn"
        id="prev-date"
        type="button"
        onClick={handlePrevDateClick}
      />
      <span className="calendar-nav__month">{currentMounth}</span>
      <span className="calendar-nav__year">{currentYear}</span>
      <button
        className="calendar-nav__next-btn"
        id="next-date"
        type="button"
        onClick={handleNextDateClick}
      />
    </div>
    <ul>
      <li>
        <button className="calendar-nav__views-btn" id="week-btn" type="button">
          Week
        </button>
        <button
          className="calendar-nav__views-btn calendar-nav__views-btn--active"
          id="mouth-btn"
          type="button"
        >
          Mounth
        </button>
        <button className="calendar-nav__views-btn" id="day-btn" type="button">
          Day
        </button>
      </li>
    </ul>
  </nav>
);

Navigation.propTypes = {
  handlePrevDateClick: PropTypes.func.isRequired,
  handleNextDateClick: PropTypes.func.isRequired,
  currentMounth: PropTypes.string.isRequired,
  currentYear: PropTypes.number.isRequired,
};

export default Navigation;
