import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Logo from '../../Logo';
import SearchInput from '../SearchInput';
import BellIcon from './Icons/BellIcon';
import UpdateIcon from './Icons/UpdateIcon';
import MobileMenuIcon from './Icons/MobileMenuIcon';
import SearchIcon from './Icons/SearchIcon';
import './styles.css';

const Topbar = ({ handleMenuClick }) => (
  <nav className="topbar">
    <button className="topbar__mobile-menu-btn" type="button" onClick={handleMenuClick}>
      <MobileMenuIcon />
    </button>
    <div className="topbar__logo">
      <Link to="/">
        <Logo />
      </Link>
    </div>
    <ul className="topbar__menu">
      <li className="topbar__menu-item">
        <SearchInput />
      </li>
      <li className="topbar__menu-item topbar__menu-icon">
        <BellIcon />
      </li>
      <li className="topbar__menu-item topbar__menu-icon">
        <UpdateIcon />
      </li>
    </ul>
    <button className="topbat__search-btn" type="button">
      <SearchIcon />
    </button>
  </nav>
);

Topbar.propTypes = {
  handleMenuClick: PropTypes.func.isRequired,
};

export default Topbar;
