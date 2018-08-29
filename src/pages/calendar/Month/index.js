import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { prevMonth, nextMonth, selectDay } from '../../../modules/Calendar';
import './styles.css';
import Day from './Day';
import Navigation from '../Navigation';
import DaysLabels from '../DaysLabels';
import DaySidebar from '../Day';
import { dateToString } from '../../../utils/date';

class Month extends Component {
  weekDay = date => (date.getDay() - 1 < 0 ? 6 : date.getDay() - 1);

  generateDays = (year, mounth) => {
    const { match, selectDay } = this.props;
    const currentDate = new Date(year, mounth);
    const prevMonthDate = new Date(year, mounth, 0).getDate();
    const nextMonthDate = new Date(year, mounth + 1);
    const days = [];
    let weeks = Array(6).fill(0);

    for (let i = 0, day = 1; i < 6 * 7; i += 1) {
      const weekDay = this.weekDay(currentDate);
      if (i < weekDay) {
        days.push(<Day key={i} day={prevMonthDate - weekDay + i + 1} className="other-month" />);
      } else if (day > currentDate.getDate()) {
        days.push(<Day key={i} day={nextMonthDate.getDate()} className="other-month" />);
        nextMonthDate.setDate(nextMonthDate.getDate() + 1);
      } else {
        days.push(
          <Day
            key={currentDate.toDateString()}
            day={currentDate.getDate()}
            date={dateToString(currentDate)}
            today={dateToString(new Date()) === dateToString(currentDate)}
            selectDay={selectDay}
            {...{ match }}
          />
        );
        currentDate.setDate(currentDate.getDate() + 1);
        day += 1;
      }
      if (day > currentDate.getDate() && this.weekDay(nextMonthDate) === 0) break;
    }

    weeks = weeks.map((el, i) => <tr key={i}>{days[7] ? days.splice(0, 7) : days.splice(0)}</tr>);

    return <tbody>{weeks}</tbody>;
  };

  render() {
    const {
      currentYear,
      currentMounth,
      listOfMonthLabels,
      prevMonth,
      nextMonth,
      match,
    } = this.props;
    return (
      <div>
        <div className="calendar-main">
          <Navigation
            currentMounth={listOfMonthLabels[currentMounth]}
            currentYear={currentYear}
            handlePrevDateClick={prevMonth}
            handleNextDateClick={nextMonth}
          />
          <div className="calendar-main__content">
            <table className="calendar-mounth">
              <thead>
                <DaysLabels />
              </thead>
              {this.generateDays(currentYear, currentMounth)}
            </table>
          </div>
        </div>
        <div className="calendar__day-sidebar">
          <DaySidebar />
          <Route path={`${match.path}/:day`} />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    listOfMonthLabels: state.calendar.listOfMonthLabels,
    currentMounth: state.calendar.currentMounth,
    currentYear: state.calendar.currentYear,
  }),
  { prevMonth, nextMonth, selectDay }
)(Month);

Month.propTypes = {
  prevMonth: PropTypes.func.isRequired,
  nextMonth: PropTypes.func.isRequired,
  selectDay: PropTypes.func.isRequired,
  currentMounth: PropTypes.number.isRequired,
  currentYear: PropTypes.number.isRequired,
  listOfMonthLabels: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
};
