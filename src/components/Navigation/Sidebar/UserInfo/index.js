import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './styles.css';

const progress = 61;

class UserInfo extends Component {
  displayProgress = userProgress => {
    const offset = -237;
    const pixelsInLevel = 2.37;
    return offset - userProgress * pixelsInLevel;
  };

  render() {
    const {
      user: { avatar, first_name: firstName, last_name: lastName, email },
    } = this.props;

    return (
      <div className="user-info">
        <div className="user-info__avatar">
          <div className="user-info__avatar-wrapper">
            <img src={avatar} alt="User avatar" />
          </div>
          <svg xmlns="http://www.w3.org/2000/svg">
            <circle
              className="user-info__progress-bar"
              cx="50%"
              cy="50%"
              r="36"
              strokeDashoffset={this.displayProgress(progress)}
            />
          </svg>
          <span className="user-info__progress-number">{progress}</span>
        </div>
        <p className="user-info__name">
          {firstName} {lastName}
        </p>
        <p className="user-info__email">{email}</p>
      </div>
    );
  }
}

UserInfo.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(state => ({
  user: state.auth.user.user,
}))(UserInfo);
