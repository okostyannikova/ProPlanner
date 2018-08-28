import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './calendar/styles.css';
import Month from './calendar/Month';
import Week from './calendar/Week';
import Day from './calendar/Day';
import { dateToString } from '../utils/date';

export default class Calendar extends Component {
  componentDidMount = () => {
    const { match, history } = this.props;
    const today = dateToString(new Date());
    history.push(`${match.url}/month/${today}`);
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
