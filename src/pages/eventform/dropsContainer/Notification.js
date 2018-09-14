import React, { Component } from 'react';
import NotificationIcon from 'assets/images/notification-icon.svg';

class Notification extends Component {
  render() {
    const { view } = this.props;
    const viewMode = view ? 'list-item-view' : 'list-item';

    return (
      <div className={viewMode}>
        <div>
          <img src={NotificationIcon} alt="NotificationIcon" />
          <span className="list-item-main-text">Notification</span>
        </div>
      </div>
    );
  }
}

export default Notification;
