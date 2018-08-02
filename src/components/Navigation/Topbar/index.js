import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../Logo';
import SearchInput from '../SearchInput';
import BellIcon from './BellIcon';
import UpdateIcon from './UpdateIcon';

import './styles.css';

const Topbar = () => (
  <nav className="topbar">
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
  </nav>
);

export default Topbar;
