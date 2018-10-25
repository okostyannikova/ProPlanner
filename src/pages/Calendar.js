import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './calendar/styles.css';
import Month from './calendar/Month';
import Week from './calendar/Week';
import Day from './calendar/Day';
import { eventsOperations } from '../modules/Events';
import { restoreCalendar } from '../modules/Calendar';

class Calendar extends Component {
  componentDidMount = () => {
    const { loadEvents, restoreEvents } = this.props;
    restoreEvents();
    loadEvents();
  };

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
  loadEvents: PropTypes.func.isRequired,
  restoreEvents: PropTypes.func.isRequired,
  restoreCalendar: PropTypes.func.isRequired,
};

export default connect(
  null,
  {
    loadEvents: eventsOperations.loadEvents,
    restoreEvents: eventsOperations.restoreEvents,
    restoreCalendar,
  }
)(Calendar);
