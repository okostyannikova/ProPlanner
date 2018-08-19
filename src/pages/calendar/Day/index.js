import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import './styles.css';
import ViewsButtons from '../Navigation/ViewsButtons';

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

class Day extends Component {
  constructor(props) {
    super(props);
    this.hourHeigth = 50;
    this.displayStartTime = 9;
    this.pixelsInMinute = 0.833;
  }

  componentDidMount = () => {
    this.wrapperRef.scrollTop = this.hourHeigth * this.displayStartTime;
  };

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  getHeight = (start, end) => Math.floor((end - start) / 60000) * this.pixelsInMinute;

  startTime = date => {
    const time = moment(date);
    return (time.hours() * 60 + time.minutes()) * this.pixelsInMinute;
  };

  render() {
    const hours = new Array(25).fill(0);
    const { selectedDay } = this.props;
    return (
      <div className="calendar-day">
        <header className="calendar-day__header">
          <span className="calendar-day__label">
            {selectedDay.format('DD')}
            <span>{selectedDay.format('dddd')}</span>
          </span>
          <ViewsButtons />
          <button className="add-event-btn" id="add-event" type="button" />
        </header>
        <main className="calendar-day__main">
          <div className="calendar-day__summary" />
          <div className="calendar__content" ref={this.setWrapperRef}>
            <ul className="calendar__hours-labels">
              {hours.map((el, i) => (
                <li key={i}>
                  {i < 10 ? `0${i}` : i}
                  :00
                </li>
              ))}
            </ul>
            <div className="calendar__events">
              <svg className="calendar__events-container">
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
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default connect(
  state => ({
    selectedDay: state.mounthlyCalendar.selectedDay,
  }),
  {}
)(Day);

Day.propTypes = {
  selectedDay: PropTypes.object.isRequired,
};
