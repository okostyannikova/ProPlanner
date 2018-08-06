import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const goalsList = [1, 2, 3];

export default class Goals extends Component {
  render() {
    return (
      <div className="page-content">
        Goals:
        <ul>
          {goalsList.map(id => <li key={id}><NavLink to={`/goals/${id}`}>Goal {id}</NavLink></li>)}
        </ul>
      </div>
    );
  }
}
