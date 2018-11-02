import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { eventsOperations } from 'modules/Events';
import CircularProgress from '@material-ui/core/CircularProgress';
import Logo from '../../Logo';
import SearchInput from '../SearchInput';
import BellIcon from '../../Icons/BellIcon';
import UpdateIcon from '../../Icons/UpdateIcon';
import MobileMenuIcon from '../../Icons/MobileMenuIcon';
import './styles.css';

const Topbar = ({ setButtonRef, syncWithGoogle, synchronising }) => (
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
    <ul className="topbar__menu">
      <li className="topbar__menu-item">
        <SearchInput />
      </li>
      <li className="topbar__menu-item">
        <BellIcon />
      </li>
      <li onClick={syncWithGoogle} className="topbar__menu-item" title="Sync with Google Calendar">      {/* eslint-disable-line */}
        {!synchronising ? (
          <UpdateIcon />
        ) : (
          <span className="topbar_loader-wrapper">
            <CircularProgress
              className="topbar_loader"
              thickness={5}
              style={{ color: '#fff' }}
              size={20}
            />
          </span>
        )}
      </li>
    </ul>
  </nav>
);

Topbar.defaultProps = {
  synchronising: false,
};

Topbar.propTypes = {
  setButtonRef: PropTypes.func.isRequired,
  syncWithGoogle: PropTypes.func.isRequired,
  synchronising: PropTypes.bool,
};

export default connect(
  state => ({ synchronising: state.events.synchronising }),
  { syncWithGoogle: eventsOperations.syncWithGoogle }
)(Topbar);
