import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.css';
import ViewsButtons from './ViewsButtons';

const Navigation = props => {
  const { handlePrevDateClick, handleNextDateClick, label, digit, endOfWeek } = props;
  const className = classNames('calendar-nav', { 'calendar-nav--week': endOfWeek });
  return (
    <nav className={className}>
      <div className="calendar-nav__label">
        <button
          className="calendar-nav__prev-btn"
          data-qa="prev-date"
          type="button"
          onClick={handlePrevDateClick}
        />
        {endOfWeek ? (
          <span>
            <span className="calendar-nav__text">{label}</span>
            <span className="calendar-nav__digit">{digit}</span>
            <span className="calendar-nav__dash">-</span>
            <span className="calendar-nav__text">{endOfWeek.format('MMM')}</span>
            <span className="calendar-nav__digit">{endOfWeek.format('DD')}</span>
          </span>
        ) : (
          <span>
            <span className="calendar-nav__text">{label}</span>
            <span className="calendar-nav__digit">{digit}</span>
          </span>
        )}

        <button
          className="calendar-nav__next-btn"
          data-qa="next-date"
          type="button"
          onClick={handleNextDateClick}
        />
      </div>
      <ViewsButtons />
    </nav>
  );
};

Navigation.defaultProps = {
  endOfWeek: null,
};

Navigation.propTypes = {
  handlePrevDateClick: PropTypes.func.isRequired,
  handleNextDateClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  digit: PropTypes.string.isRequired,
  endOfWeek: PropTypes.object,
};

export default Navigation;
