import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { typesOptions } from 'config';
import { millisecToMinutes, getTextColor, getWorkingTime } from 'utils/helpers';
import { getDaySummary } from 'utils/events';
import RoundButton from 'components/RoundButton';
import { prevDay, nextDay } from 'modules/Calendar';
import { eventsOperations } from 'modules/Events';
import RenderEventsContainer from '../render-events';
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

  /* componentWillReceiveProps = nextProps => {
    const { loadEvents, restoreEvents, selectedDay } = this.props;
    const prevFirstDay = selectedDay.clone().startOf('month');
    const nextFirstDay = nextProps.selectedDay.clone().startOf('month');

    if (prevFirstDay.format('YYYY-MM-DD') !== nextFirstDay.format('YYYY-MM-DD')) {
      const firstMonthDay = nextProps.selectedDay.clone().startOf('month');
      const lastMonthDay = nextProps.selectedDay.clone().endOf('month');
      const range = {
        'q[start_date[btw[d1]]]': firstMonthDay,
        'q[start_date[btw[d2]]]': lastMonthDay,
      };
      restoreEvents();
      loadEvents(null, null, range);
    }
  }; */

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

  handlePrevDay = () => {
    const { selectedDay, prevDay } = this.props;                  // eslint-disable-line
    prevDay(selectedDay);
  };

  handleNextDay = () => {
    const { selectedDay, nextDay } = this.props;                  // eslint-disable-line
    nextDay(selectedDay);
  };

  render() {
    const { selectedDay, hours, setWrapperRef, events, workingTime } = this.props; // eslint-disable-line
    return (
      <div className="calendar-day">
        <header className="calendar-day__header">
          <Navigation
            label={selectedDay.format('dddd')}
            digit={selectedDay.format('DD')}
            handlePrevDateClick={this.handlePrevDay}
            handleNextDateClick={this.handleNextDay}
          />
          <RoundButton to="/event/add" type="event" />
        </header>
        <main className="calendar-day__main">
          <Summary summary={getDaySummary(events)} workingTime={workingTime} />
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

export default connect(
  state => ({
    selectedDay: state.calendar.selectedDay.clone(),
    events: state.events.eventsDayList,
    workingTime: getWorkingTime(
      state.auth.user.user.working_start_time,
      state.auth.user.user.working_end_time
    ),
    workingStartTime: parseInt(state.auth.user.user.working_start_time, 10),
  }),
  {
    prevDay,
    nextDay,
    loadEvents: eventsOperations.loadEvents,
    restoreEvents: eventsOperations.restoreEvents,
  }
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
