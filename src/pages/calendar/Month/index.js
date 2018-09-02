import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment, { months } from 'moment';
import { prevMonth, nextMonth, selectDay } from '../../../modules/Calendar';
import './styles.css';
import Day from './Day';
import Navigation from '../Navigation';
import DaysLabels from '../DaysLabels';
import DaySidebar from '../Day';

class Month extends Component {
  weekDay = date => (date.getDay() - 1 < 0 ? 6 : date.getDay() - 1);

  generateDays = date => {
    const { selectDay, selectedDay } = this.props;
    const currentDate = date.startOf('month');
    const endOfMonth = currentDate.clone().endOf('month');
    const prevMonthDate = currentDate.clone();
    const nextMonthDate = currentDate.clone().add(1, 'month');
    const days = [];
    let weeks = Array(6).fill(0);

    for (let i = 1, day = 1; i < 6 * 8; i += 1) {
      const weekDay = +currentDate.format('d') === 0 ? 7 : currentDate.format('d');
      if (i < weekDay) {
        days.push(
          <Day
            key={i}
            day={prevMonthDate
              .clone()
              .add(-weekDay + i, 'day')
              .format('DD')}
            className="other-month"
          />
        );
      } else if (day > currentDate.format('D')) {
        days.push(<Day key={i} day={nextMonthDate.format('DD')} className="other-month" />);
        nextMonthDate.add(1, 'day');
      } else {
        days.push(
          <Day
            key={currentDate.format('YYYY-M-DD')}
            day={currentDate.format('DD')}
            date={currentDate.format('YYYY-M-DD')}
            today={moment().format('YYYY-M-DD') === currentDate.format('YYYY-M-DD')}
            selectDay={selectDay}
            selectedDay={selectedDay.format('YYYY-M-DD')}
          />
        );
        currentDate.add(1, 'day');
        day += 1;
      }
      const endMonth = +endOfMonth.format('D') + 1;
      if (day > +endOfMonth.format('D') && +nextMonthDate.format('d') === 1) break;
      if (day === endMonth && +endOfMonth.format('d') === 0) break;

      /*  if (
        day >= currentDate.format('D') &&
        (nextMonthDate.format('d') === 0 || currentDate.format('d') === 0)
      )
        break; */
    }

    weeks = weeks.map((el, i) => <tr key={i}>{days[7] ? days.splice(0, 7) : days.splice(0)}</tr>);

    return <tbody>{weeks}</tbody>;
  };

  render() {
    const { currentDate, currentYear, prevMonth, nextMonth } = this.props;
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
              {this.generateDays(currentDate)}
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
  currentYear: PropTypes.string.isRequired,
};

/* import React, { Component } from 'react';
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
      console.log('count ', day);
      console.log('current day', currentDate.getDate());
      if (
        day > currentDate.getDate() &&
        (this.weekDay(nextMonthDate) === 1 || this.weekDay(currentDate) === 0)
      )
        break;
    }

    weeks = weeks.map((el, i) => <tr key={i}>{days[7] ? days.splice(0, 7) : days.splice(0)}</tr>);

    return <tbody>{weeks}</tbody>;
  };

  render() {
    const { currentDate, currentYear, currentMounth, prevMonth, nextMonth } = this.props;
    console.log(currentMounth, currentYear);
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
}; */
