import React from 'react';
import PropTypes from 'prop-types';
import WithOpenHandler from 'components/hocs/WithOpenHandler';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import './styles.css';

const Navigation = ({ isOpen, setButtonRef, setWrapperRef, handleMenuClick }) => (
  <div className="navigation">
    <div className="navigation-topbar">
      <Topbar setButtonRef={setButtonRef} />
    </div>
    <div
      className={`navigation-sidebar ${isOpen ? 'nav--show' : 'nav--hidden'}`}
      ref={setWrapperRef}
    >
      <Sidebar handleMenuClick={handleMenuClick} />
    </div>
  </div>
);

Navigation.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setButtonRef: PropTypes.func.isRequired,
  setWrapperRef: PropTypes.func.isRequired,
  handleMenuClick: PropTypes.func.isRequired,
};

export default WithOpenHandler(Navigation);
