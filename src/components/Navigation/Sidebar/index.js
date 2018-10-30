import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { authorizeOperations } from 'modules/Authentication';
import './styles.css';
import HomeIcon from '../../Icons/HomeIcon';
import CalendarIcon from '../../Icons/CalendarIcon';
import GoalIcon from '../../Icons/GoalIcon';
import EventIcon from '../../Icons/EventIcon';
import SettingsIcon from '../../Icons/SettingsIcon';
import LogoutIcon from '../../Icons/LogoutIcon';
import UserInfo from './UserInfo';

const activeColor = {
  color: '#00BCD4',
  backgroundColor: 'rgba(0, 188, 212, 0.15)',
};

const menuItems = [
  { item: 'Home', to: '/', icon: <HomeIcon />, exact: true },
  { item: 'Calendar', to: '/calendar', icon: <CalendarIcon /> },
  { item: 'Goals list', to: '/goals', icon: <GoalIcon /> },
  { item: 'Events list', to: '/events', icon: <EventIcon /> },
  { item: 'Settings', to: '/settings', icon: <SettingsIcon /> },
];

class Sidebar extends Component {
  logout = () => {
    const { logout } = this.props;
    logout();
  };

  render() {
    const { handleMenuClick } = this.props;
    return (
      <div className="sidebar">
        <div className="sidebar__user-info">
          <UserInfo />
        </div>
        <nav className="sidebar__menu">
          <ul className="sidebar__menu-list">
            {menuItems.map(item => (
              <li className="sidebar__menu-item" key={item.item}>
                <NavLink
                  exact={item.exact && true}
                  to={item.to}
                  activeStyle={activeColor}
                  data-qa="sidebar-menu-item"
                  onClick={handleMenuClick}
                >
                  {item.icon}
                  {item.item}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <button className="logout-btn" onClick={this.logout} data-qa="logout-btn" type="button">
          <LogoutIcon />
          Log Out
        </button>
      </div>
    );
  }
}

Sidebar.propTypes = {
  logout: PropTypes.func.isRequired,
  handleMenuClick: PropTypes.func.isRequired,
};

export default connect(
  null,
  { logout: authorizeOperations.logingOut },
  null,
  { pure: false }
)(Sidebar);
