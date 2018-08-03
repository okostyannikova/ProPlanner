import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './styles.css';
import HomeIcon from './Icons/HomeIcon';
import CalendarIcon from './Icons/CalendarIcon';
import GoalIcon from './Icons/GoalIcon';
import SettingsIcon from './Icons/SettingsIcon';
import UserInfo from './UserInfo';

const activeColor = {
  color: '#00BCD4',
  backgroundColor: 'rgba(0, 188, 212, 0.15)',
};

export default class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <div className="sidebar__user-info">
          <UserInfo />
        </div>
        <nav className="sidebar__menu">
          <ul className="sidebar__menu-list">
            <li className="sidebar__menu-item">
              <NavLink exact to="/" activeStyle={activeColor}>
                <HomeIcon />
                Home
              </NavLink>
            </li>
            <li className="sidebar__menu-item">
              <NavLink to="/calendar" activeStyle={activeColor}>
                <CalendarIcon />
                Calendar
              </NavLink>
            </li>
            <li className="sidebar__menu-item">
              <NavLink to="/goals" activeStyle={activeColor}>
                <GoalIcon />
                Goals list
              </NavLink>
            </li>
            <li className="sidebar__menu-item">
              <NavLink to="/settings" activeStyle={activeColor}>
                <SettingsIcon />
                Settings
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
