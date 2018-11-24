import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Notifications from 'react-notification-system-redux';

const ErrorPopUp = ({ notifications }) => <Notifications notifications={notifications} />;

ErrorPopUp.propTypes = {
  notifications: PropTypes.array.isRequired,
};

export default connect(state => ({ notifications: state.notifications }))(ErrorPopUp);
