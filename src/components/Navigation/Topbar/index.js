import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Logo from '../../Logo';
import MobileMenuIcon from '../../Icons/MobileMenuIcon';
import './styles.css';

const Topbar = ({ setButtonRef }) => (
  <nav className="topbar">
    <button
      className="topbar__mobile-menu-btn"
      data-qa="mobile-menu-btn"
      type="button"
      ref={setButtonRef}
    >
      <MobileMenuIcon />
    </button>
    <div className="topbar__logo">
      <Link to="/" data-qa="logo-home-link">
        <Logo />
      </Link>
    </div>
  </nav>
);

Topbar.propTypes = {
  setButtonRef: PropTypes.func.isRequired,
};

export default Topbar;
