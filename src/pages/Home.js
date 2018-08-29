import React from 'react';
import { Link } from 'react-router-dom';
import './home/styles.css';
import Logo from '../components/Logo';
import CalendarIcon from '../components/Icons/CalendarIcon';
import GoalIcon from '../components/Icons/GoalIcon';

const Home = () => (
  <div className="page-content home">
    <div className="home__wrapper">
      <div className="home__logo">
        <Logo />
      </div>
      <h1 className="home__title">Welcome</h1>
      <p className="home__text">
        Lorem ipsum dolor sit amet, sed do eiusmod tempor ut labore et dolore magna aliqua ut enim
        ad minim veniam.
      </p>
      <div className="home__buttons-wrapper">
        <Link to="/" className="home__button" id="set-goals">
          <GoalIcon />
          Goal Setter
        </Link>
        <Link to="/calendar" className="home__button" id="calendar">
          <CalendarIcon />
          Calendar
        </Link>
      </div>
      <p className="home__text home__footer">
        Lorem ipsum dolor sit amet, sed do eiusmod
        <a href="" className="home__footer-link" id="home__footer-link">
          Lorem ipsum dolor
        </a>
      </p>
    </div>
  </div>
);

export default Home;
