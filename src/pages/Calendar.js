import React, { Component } from 'react';
import { connect } from 'react-redux';
import Day from './calendar/Day';

class Calendar extends Component {
  getDaysLabels = () => {
    const daysLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return daysLabels.map(day => <th key={day}>{day}</th>);
  };

  weekDay = date => (date.getDay() - 1 < 0 ? 6 : date.getDay() - 1);

  today = date => `${date.getFullYear()} ${date.getMonth()} ${date.getDate()}`;

  generateDays = (year, mounth) => {
    const currentDate = new Date(year, mounth);
    const prevMonth = new Date(year, mounth, 0).getDate();
    const nextMonth = new Date(year, mounth + 1);
    const days = [];
    let weeks = Array(6).fill(0);

    for (let i = 0, day = 1; i < 6 * 7; i += 1) {
      const weekDay = this.weekDay(currentDate);
      if (i < weekDay) {
        days.push(<Day key={i} date={prevMonth - weekDay + i + 1} className="other-month" />);
      } else if (day > currentDate.getDate()) {
        days.push(<Day key={i} date={nextMonth.getDate()} className="other-month" />);
        nextMonth.setDate(nextMonth.getDate() + 1);
      } else {
        days.push(
          <Day
            key={currentDate.toDateString()}
            date={currentDate.getDate()}
            today={this.today(new Date()) === this.today(currentDate)}
          />
        );
        currentDate.setDate(currentDate.getDate() + 1);
        day += 1;
      }
      if (day > currentDate.getDate() && this.weekDay(nextMonth) === 0) break;
    }

    weeks = weeks.map((el, i) => <tr key={i}>{days[7] ? days.splice(0, 7) : days.splice(0)}</tr>);

    return <tbody>{weeks}</tbody>;
  };

  render() {
    const { currentMounth, currentYear, listOfMonthLabels } = this.props;
    return (
      <div className="page-content calendar-mounth">
        <div className="calendar-mounth">
          <h1 className="calendar-mounth__header">
            {listOfMonthLabels[currentMounth]} {currentYear}
          </h1>
          <table>
            <thead>
              <tr>{this.getDaysLabels()}</tr>
            </thead>
            {this.generateDays(currentYear, currentMounth)}
          </table>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  listOfMonthLabels: state.mounthlyCalendar.listOfMonthLabels,
  currentMounth: state.mounthlyCalendar.currentMounth,
  currentYear: state.mounthlyCalendar.currentYear,
}))(Calendar);
