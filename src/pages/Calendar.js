import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import './calendar/styles.css';
import { prevMonth, nextMonth } from '../modules/Calendar';
import Navigation from './calendar/Navigation';
import Month from './calendar/Month';
import DaySidebar from './calendar/DaySidebar';
import { dateToString } from '../utils/dateToString';

class Calendar extends Component {
  componentDidMount = () => {
    const { match, history } = this.props;
    const today = dateToString(new Date());
    history.push(`${match.url}/${today}`);
  };

  render() {
    const {
      currentMounth,
      currentYear,
      listOfMonthLabels,
      prevMonth,
      nextMonth,
      match } = this.props;
    return (
      <div className="page-content calendar">
        <div className="calendar-main">
          <Navigation
            currentMounth={listOfMonthLabels[currentMounth]}
            currentYear={currentYear}
            handlePrevDateClick={prevMonth}
            handleNextDateClick={nextMonth}
          />
          <div className="calendar-main__content">
            <Month currentYear={currentYear} currentMounth={currentMounth} {...{ match }} />
          </div>
        </div>
        <Route path={`${match.path}/:day`} component={DaySidebar} />
      </div>
    );
  }
}

export default connect(
  state => ({
    listOfMonthLabels: state.mounthlyCalendar.listOfMonthLabels,
    currentMounth: state.mounthlyCalendar.currentMounth,
    currentYear: state.mounthlyCalendar.currentYear,
  }),
  { prevMonth, nextMonth }
)(Calendar);

Calendar.propTypes = {
  prevMonth: PropTypes.func.isRequired,
  nextMonth: PropTypes.func.isRequired,
  currentMounth: PropTypes.number.isRequired,
  currentYear: PropTypes.number.isRequired,
  listOfMonthLabels: PropTypes.array,
};
