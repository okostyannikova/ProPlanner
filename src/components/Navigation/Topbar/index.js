import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Logo from '../../Logo';
import SearchInput from '../SearchInput';
import BellIcon from '../../Icons/BellIcon';
import UpdateIcon from '../../Icons/UpdateIcon';
import MobileMenuIcon from '../../Icons/MobileMenuIcon';
import './styles.css';

const Topbar = ({ setButtonRef }) => (
  <nav className="topbar">
    <button className="topbar__mobile-menu-btn" type="button" ref={setButtonRef}>
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
      <li className="topbar__menu-item">
        <BellIcon />
      </li>
      <li className="topbar__menu-item">
        <UpdateIcon />
      </li>
    </ul>
  </nav>
);

Topbar.propTypes = {
  setButtonRef: PropTypes.func.isRequired,
};

export default Topbar;
