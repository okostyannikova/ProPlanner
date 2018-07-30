import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import styled from 'styled-components';
import logo from './logo.svg';
import './App.css';

const AppWrapper = styled.div`
text-align: center;
`

class App extends Component {
  render() {
    return (
      <AppWrapper>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </AppWrapper>
    );
  }
}

export default App;
