import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './calendar/styles.css';
import Month from './calendar/Month';
import Week from './calendar/Week';
import Day from './calendar/Day';
import { eventsOperations } from '../modules/Events';
import { restoreCalendar, selectDay } from '../modules/Calendar';

class Calendar extends Component {
  componentWillUnmount = () => {
    const { restoreCalendar } = this.props;   //eslint-disable-line
    restoreCalendar();
  };

  render() {
    const { match } = this.props;
    return match.isExact ? (
      <Redirect to={`${match.path}/month`} />
    ) : (
      <div className="page-content calendar">
        <Switch>
          <Route path={`${match.path}/month`} component={Month} />
          <Route path={`${match.path}/week`} component={Week} />
          <Route path={`${match.path}/day`} component={Day} />
          <Redirect to="/page-not-found" />
        </Switch>
      </div>
    );
  }
}

Calendar.propTypes = {
  match: PropTypes.object.isRequired,
  currentDate: PropTypes.object.isRequired,
  loadEvents: PropTypes.func.isRequired,
  restoreEvents: PropTypes.func.isRequired,
  restoreCalendar: PropTypes.func.isRequired,
};

export default connect(
  state => ({ currentDate: state.calendar.currentDate.clone() }),
  {
    restoreEvents: eventsOperations.restoreEvents,
    loadEvents: eventsOperations.loadEvents,
    restoreCalendar,
    selectDay,
  }
)(Calendar);
