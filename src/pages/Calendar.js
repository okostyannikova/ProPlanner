import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import './calendar/styles.css';
import Month from './calendar/Month';
import Week from './calendar/Week';
import Day from './calendar/Day';
import { loadEvents } from '../modules/Events/actions';

class Calendar extends Component {
  componentDidMount = () => {
    const { match, history, loadEvents } = this.props;
    loadEvents();
    history.push(`${match.url}/month/`);
  };

  render() {
    const { match } = this.props;
    return (
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
  { loadEvents }
)(Calendar);
