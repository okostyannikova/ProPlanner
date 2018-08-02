import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Calendar from './pages/Calendar';
import Goals from './pages/Goals';
import Goal from './pages/Goal';
import Events from './pages/Events';
import Event from './pages/Event';
import Settings from './pages/Settings';
import Navigation from './components/Navigation';

export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <PrivateRoute exact path="/" component={Navigation} />
          <PrivateRoute path="/calendar" component={Navigation} />
          <PrivateRoute path="/goals/:id" component={Navigation} />
          <PrivateRoute exact path="/goals" component={Navigation} />
          <PrivateRoute path="/events/:id" component={Navigation} />
          <PrivateRoute exact path="/events" component={Navigation} />
          <PrivateRoute path="/settings" component={Navigation} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/calendar" component={Calendar} />
          <PrivateRoute path="/goals/:id" component={Goal} />
          <PrivateRoute exact path="/goals" component={Goals} />
          <PrivateRoute path="/events/:id" component={Event} />
          <PrivateRoute exact path="/events" component={Events} />
          <PrivateRoute path="/settings" component={Settings} />
        </Switch>
      </div>
    );
  }
}
