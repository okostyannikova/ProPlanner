import React, { Component } from 'react';
import NotificationIcon from 'assets/images/SvgJs/NotificationIcon.js';

class Notification extends Component {
  render() {
    return (
      <div className="list-item">
        <div>
          <NotificationIcon />
          <span className="list-item-main-text">Notification</span>
        </div>
      </div>
    );
  }
}

export default Notification;
