import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import ViewsButtons from './ViewsButtons';

const Navigation = props => {
  const { handlePrevDateClick, handleNextDateClick, currentMounth, currentYear } = props;
  return (
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
      <ViewsButtons />
    </nav>
  );
};

Navigation.propTypes = {
  handlePrevDateClick: PropTypes.func.isRequired,
  handleNextDateClick: PropTypes.func.isRequired,
  currentMounth: PropTypes.string.isRequired,
  currentYear: PropTypes.number.isRequired,
};

export default Navigation;
