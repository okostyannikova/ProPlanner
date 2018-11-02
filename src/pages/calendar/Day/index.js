import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { typesOptions } from 'config';
import { millisecToMinutes, getTextColor } from 'utils/helpers';
import RoundButton from 'components/RoundButton';
import RenderEventsContainer from '../render-events';
import { prevDay, nextDay } from '../../../modules/Calendar';
import './styles.css';
import Navigation from '../Navigation';
import Summary from './Summary';

class Day extends Component {
  constructor(props) {
    super(props);
    this.minutesInSmallEvent = 75;
    this.minutesInMiddleEvent = 100;
  }

  componentDidMount = () => {
    const { setHeight } = this.props;
    setHeight(50);
  };

  getDaySummary = () => {
    const { events } = this.props;
    const summary = {};
    events.forEach(ev => {
      const { 'start-date': start, 'end-date': end, 'event-type': type } = ev.attributes;
      const eventLength = millisecToMinutes(end - start);
      if (summary[type]) {
        summary[type] += eventLength;
      } else {
        summary[type] = eventLength;
      }
    });
    return summary;
  };

  displayEvents = () => {
    const { events, startTime, getHeight, handleShow } = this.props;

    if (events.length) {
      return events.map(ev => {
        const { 'start-date': start, 'end-date': end, 'event-type': type, title } = ev.attributes;
        const startPos = startTime(start.clone());
        const blockHeight = getHeight(start.clone().valueOf(), end.clone().valueOf());
        const isEditable = type !== 'google';
        const eventLength = millisecToMinutes(end - start);
        const isEventSmall = eventLength < this.minutesInSmallEvent;
        const isEventMiddle =
          eventLength >= this.minutesInSmallEvent && eventLength < this.minutesInMiddleEvent;

        return (
          <div                                                                            // eslint-disable-line
            onClick={isEditable ? handleShow(ev.id) : undefined}
            className={`event-block ${isEventSmall && 'event-block--small'}`}
            key={ev.id}
            style={{
              top: startPos,
              height: blockHeight,
              backgroundColor: typesOptions[type],
              color: getTextColor(typesOptions[type]),
            }}
          >
            <span className="event-block__time">
              {start.format('HH:mm')} - {end.format('HH:mm')}
            </span>
            {eventLength >= 60 ? <br /> : null}
            <span className={`event-block__title ${isEventMiddle && 'event-block__title--middle'}`}>
              {title}
            </span>
          </div>
        );
      });
    }
    return null;
  };

  render() {
    const { selectedDay, hours, setWrapperRef, prevDay, nextDay, } = this.props; // eslint-disable-line
    this.getDaySummary();
    return (
      <div className="calendar-day">
        <header className="calendar-day__header">
          <Navigation
            label={selectedDay.format('dddd')}
            digit={selectedDay.format('DD')}
            handlePrevDateClick={prevDay}
            handleNextDateClick={nextDay}
          />
          <RoundButton to="/event/add" type="event" />
        </header>
        <main className="calendar-day__main">
          <Summary summary={this.getDaySummary()} />
          <div className="calendar__content" ref={setWrapperRef}>
            <ul className="calendar__hours-labels">{hours()}</ul>
            <div className="calendar__events">
              <div className="calendar__events-container">{this.displayEvents()}</div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

const getEvents = (day, events) => {
  if (events) {
    const today = day.format('YYYY-MM-DD');
    return events.filter(ev => {
      const eventDay = ev.attributes['start-date'].clone().format('YYYY-MM-DD');
      return today === eventDay;
    });
  }
  return null;
};

export default connect(
  state => ({
    selectedDay: state.calendar.selectedDay.clone(),
    events: getEvents(state.calendar.selectedDay.clone(), state.events.eventsList),
  }),
  { prevDay, nextDay }
)(RenderEventsContainer(Day));

Day.propTypes = {
  // from connect
  events: PropTypes.array.isRequired,
  selectedDay: PropTypes.object.isRequired,
  prevDay: PropTypes.func.isRequired,
  nextDay: PropTypes.func.isRequired,
  // from hoc
  setHeight: PropTypes.func.isRequired,
  startTime: PropTypes.func.isRequired,
  getHeight: PropTypes.func.isRequired,
  hours: PropTypes.func.isRequired,
  setWrapperRef: PropTypes.func.isRequired,
  handleShow: PropTypes.func.isRequired,
};
