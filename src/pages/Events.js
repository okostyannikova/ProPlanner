import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const eventsList = [1, 2, 3];

export default class Events extends Component {
  render() {
    return (
      <div>
        Events:
          <ul>{eventsList.map(id => <li key={id}><NavLink to={`/events/${id}`}>Event {id}</NavLink></li>)}</ul>
      </div>
    );
  }
}
