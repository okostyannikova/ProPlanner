import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withWindowWidth } from 'components/hocs/window-context';
import moment from 'moment';
import { prevMonth, nextMonth, selectDay } from 'modules/Calendar';
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
            key={currentDate.format('YYYY-MM-DD')}
            day={currentDate.format('DD')}
            date={currentDate.format('YYYY-MM-DD')}
            today={moment().format('YYYY-MM-DD') === currentDate.format('YYYY-MM-DD')}
            selectDay={selectDay}
            selectedDay={selectedDay.format('YYYY-MM-DD')}
          />
        );
        currentDate.add(1, 'day');
        day += 1;
      }
      const endMonth = +endOfMonth.format('D') + 1;
      if (day > +endOfMonth.format('D') && +nextMonthDate.format('d') === 1) break;
      if (day === endMonth && +endOfMonth.format('d') === 0) break;
    }

    weeks = weeks.map((el, i) => <tr key={i}>{days[7] ? days.splice(0, 7) : days.splice(0)}</tr>);

    return <tbody>{weeks}</tbody>;
  };

  render() {
    const { currentDate, currentYear, prevMonth, nextMonth, windowWidth } = this.props;
    return (
      <div>
        <div className="calendar-main calendar-main--mobile">
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
              {this.generateDays(currentDate.clone())}
            </table>
          </div>
        </div>
        {windowWidth > 768 && (
          <div className="calendar__day-sidebar">
            <DaySidebar />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentDate: state.calendar.currentDate.clone(),
  currentYear: state.calendar.currentDate.clone().format('YYYY'),
  selectedDay: state.calendar.selectedDay.clone(),
});

export default compose(
  connect(
    mapStateToProps,
    { prevMonth, nextMonth, selectDay }
  ),
  withWindowWidth
)(Month);

Month.propTypes = {
  prevMonth: PropTypes.func.isRequired,
  nextMonth: PropTypes.func.isRequired,
  selectDay: PropTypes.func.isRequired,
  currentDate: PropTypes.object.isRequired,
  selectedDay: PropTypes.object.isRequired,
  currentYear: PropTypes.string.isRequired,
  windowWidth: PropTypes.number.isRequired,
};
