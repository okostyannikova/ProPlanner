import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { typesOptions } from 'config';
import { millisecToMinutes, getTextColor, getWorkingTime } from 'utils/helpers';
import { getDaySummary } from 'utils/events';
import RoundButton from 'components/RoundButton';
import { prevDay, nextDay, selectDay } from 'modules/Calendar';
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
    const { setHeight, selectDay, location } = this.props;   //eslint-disable-line
    setHeight(50);

    if (location.pathname === '/calendar/day') {
      const { loadEvents, restoreEvents, selectedDay } = this.props;    //eslint-disable-line
      const firstMonthDay = selectedDay
        .clone()
        .startOf('month')
        .format('YYYY-MM-DD');
      const lastMonthDay = selectedDay
        .clone()
        .endOf('month')
        .format('YYYY-MM-DD');
      const range = {
        'q[start_date[btw[d1]]]': firstMonthDay,
        'q[start_date[btw[d2]]]': lastMonthDay,
      };
      restoreEvents();
      loadEvents(undefined, 500, range).then(() => selectDay(selectedDay));
    }
  };

  componentWillReceiveProps = nextProps => {
    const { loadEvents, restoreEvents, selectedDay, location } = this.props;
    const prevFirstDay = selectedDay.clone().startOf('month');
    const nextFirstDay = nextProps.selectedDay.clone().startOf('month');
    if (location.pathname === '/calendar/day') {
      if (prevFirstDay.format('YYYY-MM-DD') !== nextFirstDay.format('YYYY-MM-DD')) {
        const firstMonthDay = nextProps.selectedDay
          .clone()
          .startOf('month')
          .format('YYYY-MM-DD');
        const lastMonthDay = nextProps.selectedDay
          .clone()
          .endOf('month')
          .format('YYYY-MM-DD');
        const range = {
          'q[start_date[btw[d1]]]': firstMonthDay,
          'q[start_date[btw[d2]]]': lastMonthDay,
        };
        restoreEvents();
        loadEvents(undefined, 500, range);
      }
    }
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
          <CSSTransition
            key={ev.id}
            in
            appear
            classNames="calendar-animation"
            timeout={{ enter: 400, exit: 300 }}
          >
            <div // eslint-disable-line
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
              <CSSTransition
                key={ev.id}
                in
                appear
                classNames="calendar-text-animation"
                timeout={{ enter: 100, exit: 100 }}
              >
                <div className="event-block__text">
                  <span className="event-block__time">
                    {start.format('HH:mm')} - {end.format('HH:mm')}
                  </span>
                  {eventLength >= 60 ? <br /> : null}
                  <span
                    className={`event-block__title ${isEventMiddle &&
                      'event-block__title--middle'}`}
                  >
                    {title}
                  </span>
                </div>
              </CSSTransition>
            </div>
          </CSSTransition>
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
              <div className="calendar__events-container">
                <TransitionGroup component={null}>{this.displayEvents()} </TransitionGroup>
              </div>
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
    selectDay,
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
  selectDay: PropTypes.func.isRequired,
  // from hoc
  setHeight: PropTypes.func.isRequired,
  startTime: PropTypes.func.isRequired,
  getHeight: PropTypes.func.isRequired,
  hours: PropTypes.func.isRequired,
  setWrapperRef: PropTypes.func.isRequired,
  handleShow: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};
