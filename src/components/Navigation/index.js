import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import './styles.css';

export default class Navigation extends Component {
  state = {
    isOpen: false,
  };

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  setButtonRef = node => {
    this.buttonRef = node;
  };

  handleMenuClick = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  handleClickOutside = ev => {
    const { isOpen } = this.state;
    const wrapperRef = ReactDOM.findDOMNode(this.wrapperRef);
    const buttonRef = ReactDOM.findDOMNode(this.buttonRef);

    if (ev.target === buttonRef || buttonRef.contains(ev.target)) {
      this.handleMenuClick();
    } else if (isOpen && wrapperRef && !wrapperRef.contains(ev.target)) {
      this.handleMenuClick();
    }
  };

  render() {
    const { isOpen } = this.state;
    return (
      <div className="navigation">
        <div className="navigation-topbar">
          <Topbar setButtonRef={this.setButtonRef} />
        </div>
        <div className={`navigation-sidebar ${isOpen ? 'nav--show' : 'nav--hidden'}`}>
          <Sidebar ref={this.setWrapperRef} />
        </div>
      </div>
    );
  }
}
