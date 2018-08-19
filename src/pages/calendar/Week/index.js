import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import classNames from 'classnames';
import { prevMonth, nextMonth, selectDay } from '../../../modules/Calendar';
import './styles.css';
import Navigation from '../Navigation';
import DaySidebar from '../Day';

const eventList = [
  {
    id: 1,
    name: 'Fake event',
    description:
      'Nobis odio necessitatibus expedita vitae amet error eum mollitia, non voluptas? Ex magnam recusandae iure voluptates officia fugit itaque nemo illo velit.',
    type: 'work',
    priority: 'important',
    start: moment()
      .hour(9)
      .minutes(0)
      .valueOf(),
    end: moment()
      .hour(12)
      .minutes(0)
      .valueOf(),
    status: 'pending',
  },
  {
    id: 2,
    name: 'Fake event',
    description:
      'Nobis odio necessitatibus expedita vitae amet error eum mollitia, non voluptas? Ex magnam recusandae iure voluptates officia fugit itaque nemo illo velit.',
    type: 'education',
    priority: 'important',
    start: moment()
      .hour(12)
      .minutes(30)
      .valueOf(),
    end: moment()
      .hour(13)
      .minutes(0)
      .valueOf(),
    status: 'pending',
  },
  {
    id: 3,
    name: 'Fake event',
    description:
      'Nobis odio necessitatibus expedita vitae amet error eum mollitia, non voluptas? Ex magnam recusandae iure voluptates officia fugit itaque nemo illo velit.',
    type: 'work',
    priority: 'important',
    start: moment()
      .hour(14)
      .minutes(0)
      .valueOf(),
    end: moment()
      .hour(15)
      .minutes(30)
      .valueOf(),
    status: 'pending',
  },
  {
    id: 4,
    name: 'Fake event',
    description:
      'Nobis odio necessitatibus expedita vitae amet error eum mollitia, non voluptas? Ex magnam recusandae iure voluptates officia fugit itaque nemo illo velit.',
    type: 'family',
    priority: 'important',
    start: moment()
      .hour(17)
      .minutes(0)
      .valueOf(),
    end: moment()
      .hour(19)
      .minutes(30)
      .valueOf(),
    status: 'pending',
  },
];

const colorList = {
  work: '#A9EFEA',
  education: '#FFE07F',
  family: '#FFBFD4',
};

class Week extends Component {
  constructor(props) {
    super(props);
    this.hourHeight = 70;
    this.displayStartTime = 9;
    this.pixelsInMinute = this.hourHeight / 60;
  }

  componentDidMount = () => {
    this.wrapperRef.scrollTop = this.hourHeight * this.displayStartTime;
  };

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  getHeight = (start, end) => Math.floor((end - start) / 60000) * this.pixelsInMinute;

  getDays = () => {
    const { selectedDay } = this.props;
    const firstDay = selectedDay.clone().startOf('isoWeek');
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
              x="0"
              y={this.startTime(ev.start)}
              height={this.getHeight(ev.start, ev.end)}
              fill={colorList[ev.type]}
            />
          ))}
        </svg>
      );
    });
    return days;
  };

  startTime = date => {
    const time = moment(date);
    return (time.hours() * 60 + time.minutes()) * this.pixelsInMinute;
  };

  daysLabels = () => {
    const { selectedDay } = this.props;
    const firstDay = selectedDay.clone().startOf('isoWeek');
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

  hours = () => {
    const hours = Array(...Array(25)).map((_, i) => (
      <li key={i} style={{ paddingBottom: this.hourHeight - 19 }}>
        {i < 10 ? `0${i}` : i}
        :00
      </li>
    ));

    return hours;
  };

  dividingLines = () => {
    let pos = 0;
    const lines = Array(...Array(25)).map((_, i) => {
      pos += this.hourHeight;
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
    const { currentYear, currentMounth, listOfMonthLabels } = this.props;
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
            {this.daysLabels()}
            <div className="calendar__content calendar__content--week" ref={this.setWrapperRef}>
              <ul className="calendar__hours-labels">{this.hours()}</ul>
              <div
                className="calendar__events calendar__events--week"
                style={{ height: this.hourHeight * 24 }}
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
    listOfMonthLabels: state.mounthlyCalendar.listOfMonthLabels,
    currentMounth: state.mounthlyCalendar.currentMounth,
    currentYear: state.mounthlyCalendar.currentYear,
  }),
  { prevMonth, nextMonth, selectDay }
)(Week);

Week.propTypes = {
  prevMonth: PropTypes.func.isRequired,
  nextMonth: PropTypes.func.isRequired,
  selectDay: PropTypes.func.isRequired,
  currentMounth: PropTypes.number.isRequired,
  currentYear: PropTypes.number.isRequired,
  selectedDay: PropTypes.object.isRequired,
  listOfMonthLabels: PropTypes.array.isRequired,
};
