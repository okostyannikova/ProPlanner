import React, { Component } from 'react';
import NotificationIcon from 'assets/images/notification-icon.svg';

class Notification extends Component {
  render() {
    return (
      <div className="list-item">
        <div>
          <img src={NotificationIcon} alt="NotificationIcon" />
          <span className="list-item-main-text">Notification</span>
        </div>
      </div>
    );
  }
}

export default Notification;
