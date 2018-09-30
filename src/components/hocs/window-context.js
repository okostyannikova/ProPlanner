import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

/* const getDevice = width => {
  let device;
  if (width >= 1200) {
    device = 'lg';
  } else if (width >= 992) {
    device = 'md';
  } else if (width > 768) {
    device = 'sm';
  } else {
    device = 'xs';
  }
  return device;
}; */

const WindowContext = React.createContext();

export default class WindowContextProvider extends Component {
  state = {
    windowWidth: null,
  };

  componentDidMount = () => {
    this.checkWidth()();
    window.addEventListener('resize', this.checkWidth());
  };

  checkWidth = () =>
    debounce(() => {
      const currentWidth = document.documentElement.clientWidth;
      this.setState(() => ({ windowWidth: currentWidth }));
      console.log(this.state.windowWidth);
    }, 500);

  render() {
    const { children } = this.props;
    const { windowWidth } = this.state;
    return <WindowContext.Provider value={windowWidth}>{children}</WindowContext.Provider>;
  }
}

export const withWindowWidth = ConnectedComponent =>
  function windowContextComponent(props) {
    return (
      <WindowContext.Consumer>
        {windowWidth => <ConnectedComponent {...props} windowWidth={windowWidth} />}
      </WindowContext.Consumer>
    );
  };

WindowContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
