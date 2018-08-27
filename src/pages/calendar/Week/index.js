import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import RenderEventsContainer from '../render-events';
import { prevWeek, nextWeek, selectDay } from '../../../modules/Calendar';
import './styles.css';
import Navigation from '../Navigation';
import DaySidebar from '../Day';

class Week extends Component {
  componentDidMount = () => {
    const { setHeight } = this.props;
    setHeight(70);
  };

  getDays = () => {
    const { firstWeekDay, eventList, colorList, startTime, getHeight } = this.props;
    const firstDay = firstWeekDay.clone().startOf('isoWeek');
    let currentDay;

    const days = Array(...Array(7)).map((_, i) => {
      currentDay = firstDay.clone().add(i, 'day');
      return (
        <svg
          className={`calendar__events-container ${this.className(currentDay)}`}
          key={i}
          onClick={this.handleClick(currentDay.format('YYYY-MM-DD'))}
        >
          {this.dividingLines()}
          {eventList.map(ev => (
            <rect
              key={ev.id}
              x="2%"
              y={startTime(ev.start)}
              height={getHeight(ev.start, ev.end)}
              fill={colorList[ev.type]}
            />
          ))}
        </svg>
      );
    });
    return days;
  };

  daysLabels = () => {
    const { firstWeekDay } = this.props;
    const firstDay = firstWeekDay.clone().startOf('isoWeek');
    let weekDays;

    const defaultWeekdays = Array(...Array(7)).map((_, i) => {
      weekDays = firstDay.clone().add(i, 'day');
      return (
        <li key={i} className={this.className(weekDays)}>
          {weekDays.format('ddd')}
          <p>{weekDays.format('DD')}</p>
        </li>
      );
    });

    return <ul className="days-labels">{defaultWeekdays}</ul>;
  };

  dividingLines = () => {
    const { hourHeight } = this.props;
    let pos = 0;
    const lines = Array(...Array(25)).map((_, i) => {
      pos += hourHeight;
      return <line key={i} x1="0" y1={pos} x2="100%" y2={pos} stroke="#e0edf9" strokeWidth="2" />;
    });
    return lines;
  };

  handleClick = date => () => {
    const { selectDay } = this.props;
    selectDay(date);
  };

  className = currentDay => {
    const { selectedDay } = this.props;
    return classNames({
      'calendar__selected-weekday':
        currentDay.format('YYYY-MM-DD') === selectedDay.format('YYYY-MM-DD'),
    });
  };

  render() {
    const { firstWeekDay, prevWeek, nextWeek, hourHeight, hours, setWrapperRef } = this.props;
    return (
      <div>
        <div className="calendar-main">
          <Navigation
            currentMounth={firstWeekDay.format('MMMM')}
            currentYear={firstWeekDay.format('DD')}
            handlePrevDateClick={prevWeek}
            handleNextDateClick={nextWeek}
          />
          <div className="calendar-main__content">
            {this.daysLabels()}
            <div className="calendar__content calendar__content--week" ref={setWrapperRef}>
              <ul className="calendar__hours-labels">{hours()}</ul>
              <div
                className="calendar__events calendar__events--week"
                style={{ height: hourHeight * 24 }}
              >
                {this.getDays()}
              </div>
            </div>
          </div>
          <div className="calendar__day-sidebar">
            <DaySidebar />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    selectedDay: state.mounthlyCalendar.selectedDay.clone(),
    firstWeekDay: state.mounthlyCalendar.firstWeekDay.clone(),
    listOfMonthLabels: state.mounthlyCalendar.listOfMonthLabels,
    currentMounth: state.mounthlyCalendar.currentMounth,
    currentYear: state.mounthlyCalendar.currentYear,
  }),
  { prevWeek, nextWeek, selectDay }
)(RenderEventsContainer(Week));

Week.propTypes = {
  prevWeek: PropTypes.func.isRequired,
  nextWeek: PropTypes.func.isRequired,
  selectDay: PropTypes.func.isRequired,
  currentMounth: PropTypes.number.isRequired,
  currentYear: PropTypes.number.isRequired,
  selectedDay: PropTypes.object.isRequired,
  listOfMonthLabels: PropTypes.array.isRequired,
};
