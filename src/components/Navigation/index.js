import React, { Component } from 'react';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import './styles.css';

export default class Navigation extends Component {
  state = {
    isOpen: false,
  };

  handleMenuClick = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  render() {
    const { isOpen } = this.state;
    return (
      <div>
        <div className={isOpen ? 'nav--hidden' : 'nav--show'}>
          <Topbar handleMenuClick={this.handleMenuClick} />
        </div>
        <div className={isOpen ? 'nav--show' : 'nav--hidden'}>
          <Sidebar />
        </div>
      </div>
    );
  }
}
