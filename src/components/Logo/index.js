import React from 'react';
import './styles.css';
import logo from '../../assets/images/logo.svg';

const Logo = () => (
  <div className="logo">
    <img className="logo__img" src={logo} alt="ProPlanner logo" />
    <span className="logo__text">ProPlanner</span>
  </div>
);

export default Logo;
