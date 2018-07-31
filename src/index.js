import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './index.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Calendar from './pages/Calendar';
import Goals from './pages/Goals';
import Events from './pages/Evenst';
import Settings from './pages/Settings';
import Menu from './components/Menu';

class App extends Component {
  render() {
    return (
      <div>
        <Menu />
        
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/calendar' component={Calendar} />
        <Route path='/goals' component={Goals} />
        <Route path='/goals/:id' component={Goals} />
        <Route path='/events' component={Events} />
        <Route path='/events/:id' component={Events} />
        <Route path='/settings' component={Settings} />
      </div>
    );
  }
}

ReactDOM.render(<Router>
  <App />
</Router>,
  document.getElementById('root'));
