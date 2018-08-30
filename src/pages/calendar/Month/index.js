import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
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
    const { selectDay, selectedDay } = this.props;
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
            date={moment(currentDate).format('YYYY-M-DD')}
            today={dateToString(new Date()) === dateToString(currentDate)}
            selectDay={selectDay}
            selectedDay={selectedDay.format('YYYY-M-DD')}
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
    const { currentDate, currentYear, currentMounth, prevMonth, nextMonth } = this.props;
    return (
      <div>
        <div className="calendar-main">
          <Navigation
            label={currentDate.format('MMMM')}
            digit={currentYear}
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
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    currentDate: state.calendar.currentDate.clone(),
    currentMounth: state.calendar.currentDate
      .clone()
      .add(-1, 'month')
      .format('M'),
    currentYear: state.calendar.currentDate.clone().format('YYYY'),
    selectedDay: state.calendar.selectedDay.clone(),
  }),
  { prevMonth, nextMonth, selectDay }
)(Month);

Month.propTypes = {
  prevMonth: PropTypes.func.isRequired,
  nextMonth: PropTypes.func.isRequired,
  selectDay: PropTypes.func.isRequired,
  currentDate: PropTypes.object.isRequired,
  selectedDay: PropTypes.object.isRequired,
  currentMounth: PropTypes.string.isRequired,
  currentYear: PropTypes.string.isRequired,
};
