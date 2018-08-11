import React, { Component } from 'react';
import './styles.css';
import avatar from '../../../../images/avatar.jpg';

const user = {
  name: 'Lilly Schmidt',
  email: 'testname@test.com',
  avatar,
  progress: 67,
};

export default class UserInfo extends Component {
  render() {
    return (
      <div className="user-info">
        <div className="user-info__avatar">
          <div className="user-info__avatar-wrapper">
            <img src={user.avatar} alt="User avatar" />
          </div>
          <svg>
            <circle
              className="user-info__progress-bar"
              cx="50%"
              cy="50%"
              strokeDashoffset={-237 - user.progress * 2.37}
            />
          </svg>
          <span className="user-info__progress-nummber">{user.progress}</span>
        </div>
        <p className="user-info__name">{user.name}</p>
        <p className="user-info__email">{user.email}</p>
      </div>
    );
  }
}
