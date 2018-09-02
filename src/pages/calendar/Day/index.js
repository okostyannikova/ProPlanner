import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RenderEventsContainer from '../render-events';
import { prevDay, nextDay } from '../../../modules/Calendar';
import './styles.css';
import Navigation from '../Navigation';

class Day extends Component {
  componentDidMount = () => {
    const { setHeight } = this.props;
    setHeight(50);
  };

  displayEvents = () => {
    const { events, startTime, getHeight } = this.props;
    if (events) {
      return events.map(ev => {
        const { 'start-date': start, 'end-date': end } = ev.attributes;
        return (
          <rect
            key={ev.id}
            x="0"
            y={startTime(start.clone())}
            height={getHeight(start.clone().valueOf(), end.clone().valueOf())}
            fill="#A9EFEA"
          />
        );
      });
    }
    return null;
  };

  render() {
    const { selectedDay, hours, setWrapperRef, prevDay, nextDay } = this.props;
    return (
      <div className="calendar-day">
        <header className="calendar-day__header">
          <Navigation
            label={selectedDay.format('dddd')}
            digit={selectedDay.format('DD')}
            handlePrevDateClick={prevDay}
            handleNextDateClick={nextDay}
          />
          <button className="add-event-btn" id="add-event" type="button" />
        </header>
        <main className="calendar-day__main">
          <div className="calendar-day__summary" />
          <div className="calendar__content" ref={setWrapperRef}>
            <ul className="calendar__hours-labels">{hours()}</ul>
            <div className="calendar__events">
              <svg className="calendar__events-container">{this.displayEvents()}</svg>
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
    colorTypes: state.events.colorTypes,
  }),
  { prevDay, nextDay }
)(RenderEventsContainer(Day));

Day.propTypes = {
  selectedDay: PropTypes.object.isRequired,
};
