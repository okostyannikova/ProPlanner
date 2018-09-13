import React, { Component } from 'react';
import Priority from './dropsContainer/Priority.js';
import Notification from './dropsContainer/Notification.js';
import Location from './dropsContainer/Location.js';
import Type from './dropsContainer/Type.js';

// Выровнять иконки по центру текста

class DropsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <ul className="drops-list">
          <li>
            <Priority />
          </li>
          <li>
            <Notification />
          </li>
          <li>
            <Location />
          </li>
          <li>
            <Type />
          </li>
        </ul>
      </div>
    );
  }
}

export default DropsContainer;
