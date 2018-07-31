import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import './index.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Calendar from './pages/Calendar';
import Goals from './pages/Goals';
import Goal from './pages/Goal';
import Events from './pages/Events';
import Event from './pages/Event';
import Settings from './pages/Settings';


class App extends Component {

  render() {
    return (
      <div>
        <PrivateRoute exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <PrivateRoute path='/calendar' component={Calendar} />
        <PrivateRoute path='/goals/:id' component={Goal} />
        <PrivateRoute exact path='/goals' component={Goals} />
        <PrivateRoute path='/events/:id' component={Event} />
        <PrivateRoute exact path='/events' component={Events} />
        <PrivateRoute path='/settings' component={Settings} />
      </div>
    );
  }
}

ReactDOM.render(<Router>
  <App />
</Router>,
  document.getElementById('root'));
