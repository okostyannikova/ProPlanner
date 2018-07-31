import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";
import styled from 'styled-components';

const Nav = styled.nav`
 display: flex;
 justify-content: center;
`;

const NavItem = styled.div`
  padding: 10px;
`;

const activeColor = { color: 'red' };

export default class Menu extends Component {
  static propTypes = {
  }

  render() {
    return (
      <Nav>
        <NavItem><NavLink exact to='/' activeStyle={activeColor}>Home</NavLink></NavItem>
        <NavItem><NavLink to='/login' activeStyle={activeColor}>Login</NavLink></NavItem>
        <NavItem><NavLink to='/calendar' activeStyle={activeColor}>Calendar</NavLink></NavItem>
        <NavItem><NavLink to='/goals' activeStyle={activeColor}>Goals</NavLink></NavItem>
        <NavItem><NavLink to='/events' activeStyle={activeColor}>Events</NavLink></NavItem>
        <NavItem><NavLink to='/settings' activeStyle={activeColor}>Settings</NavLink></NavItem>
      </Nav>
    )
  }
}