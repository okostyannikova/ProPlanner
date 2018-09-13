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
    const { view } = this.props;

    return (
      <div>
        <ul className="drops-list">
          <li>
            <Priority view={view} />
          </li>
          <li>
            <Notification view={view} />
          </li>
          <li>
            <Location view={view} />
          </li>
          <li>
            <Type view={view} />
          </li>
        </ul>
      </div>
    );
  }
}

export default DropsContainer;
