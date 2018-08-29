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

  render() {
    const {
      selectedDay,
      hours,
      eventList,
      colorList,
      startTime,
      getHeight,
      setWrapperRef,
      prevDay,
      nextDay,
    } = this.props;
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
              <svg className="calendar__events-container">
                {eventList.map(ev => (
                  <rect
                    key={ev.id}
                    x="0"
                    y={startTime(ev.start)}
                    height={getHeight(ev.start, ev.end)}
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
    selectedDay: state.calendar.selectedDay,
  }),
  { prevDay, nextDay }
)(RenderEventsContainer(Day));

Day.propTypes = {
  selectedDay: PropTypes.object.isRequired,
};
