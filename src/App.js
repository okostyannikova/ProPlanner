import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import './styles/main.css';
import './utils/auth';
import Home from './pages/Home';
import Login from './pages/Login';
import Calendar from './pages/Calendar';
import Goals from './pages/Goals';
import Events from './pages/Events';
import Settings from './pages/Settings';
import Navigation from './components/Navigation';
import EventForm from './pages/EventForm';
import EventAddForm from './pages/EventAddForm';

const LoginContainer = () => <Route path="/login" component={Login} />;

const DefaultContainer = () => (
  <div>
    <Navigation />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/calendar" component={Calendar} />
      <Route exact path="/goals" component={Goals} />
      <Route exact path="/events" component={Events} />
      <Route exact path="/event/add" component={EventAddForm} />
      <Route exact path="/event/:id" component={EventForm} />
      <Route exact path="/event/:id/edit" component={EventForm} />
      <Route path="/settings" component={Settings} />
    </Switch>
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
