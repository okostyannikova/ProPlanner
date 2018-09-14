import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import './styles/main.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Calendar from './pages/Calendar';
import Goals from './pages/Goals';
import Goal from './pages/Goal';
import Events from './pages/Events';
import Settings from './pages/Settings';
import Navigation from './components/Navigation';
import EventForm from './pages/EventForm';

const LoginContainer = () => <Route path="/login" component={Login} />;

const DefaultContainer = () => (
  <div>
    <Navigation />
    <Route exact path="/" component={Home} />
    <Route path="/calendar" component={Calendar} />
    <Route path="/goals/:id" component={Goal} />
    <Route exact path="/goals" component={Goals} />
    <Route exact path="/events" component={Events} />
    <Route exact path="/event/add" component={EventForm} />
    <Route exact path="/event/:id" component={EventForm} />
    <Route path="/settings" component={Settings} />
  </div>
);

export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/login" component={LoginContainer} />
          <PrivateRoute component={DefaultContainer} />
        </Switch>
      </div>
    );
  }
}
