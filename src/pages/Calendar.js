import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './calendar/styles.css';
import Month from './calendar/Month';
import Week from './calendar/Week';
import Day from './calendar/Day';
import { eventsOperations } from '../modules/Events';

class Calendar extends Component {
  componentDidMount = () => {
    const { match, history, loadEvents } = this.props;
    loadEvents();
    history.push(`${match.url}/month/`);
  };

  render() {
    const { match } = this.props;
    return match.isExact ? (
      <Redirect to={`${match.path}/month`} />
    ) : (
      <div className="page-content calendar">
        <Route path={`${match.path}/month`} component={Month} />
        <Route path={`${match.path}/week`} component={Week} />
        <Route path={`${match.path}/day`} component={Day} />
      </div>
    );
  }
}

export default connect(
  null,
  { loadEvents: eventsOperations.loadEvents }
)(Calendar);
