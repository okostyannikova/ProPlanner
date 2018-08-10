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

const menuItems = [
  { item: 'Home', to: '/', icon: <HomeIcon />, exact: true },
  { item: 'Calendar', to: '/calendar', icon: <CalendarIcon /> },
  { item: 'Goals list', to: '/goals', icon: <GoalIcon /> },
  { item: 'Settings', to: '/settings', icon: <SettingsIcon /> },
];

export default class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <div className="sidebar__user-info">
          <UserInfo />
        </div>
        <nav className="sidebar__menu">
          <ul className="sidebar__menu-list">
            {menuItems.map(item => (
              <li className="sidebar__menu-item" key={item.item}>
                <NavLink exact={item.exact && true} to={item.to} activeStyle={activeColor}>
                  {item.icon}
                  {item.item}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  }
}
