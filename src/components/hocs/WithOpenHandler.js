import React, { Component } from 'react';

const WithOpenHandler = OriginalComponent =>
  class WithOpenHandlerContainer extends Component {
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
      const {
        buttonRef,
        wrapperRef,
        state: { isOpen },
      } = this;

      if (ev.target === buttonRef || buttonRef.contains(ev.target)) {
        this.handleMenuClick();
      } else if (isOpen && wrapperRef && !wrapperRef.contains(ev.target)) {
        this.handleMenuClick();
      }
    };

    render() {
      const { isOpen } = this.state;
      return (
        <OriginalComponent
          isOpen={isOpen}
          setWrapperRef={this.setWrapperRef}
          setButtonRef={this.setButtonRef}
          handleMenuClick={this.handleMenuClick}
          {...this.props}
        />
      );
    }
  };

export default WithOpenHandler;
