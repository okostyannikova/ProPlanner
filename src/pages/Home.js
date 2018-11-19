import React from 'react';
import { Link } from 'react-router-dom';
import './home/styles.css';
import moon from 'assets/images/home/moon.png';
import monkey from 'assets/images/home/monkey.svg';
import satellite from 'assets/images/home/satellite.svg';
import starImg from 'assets/images/home/star.svg';
import { CSSTransition } from 'react-transition-group';
import Logo from '../components/Logo';
import CalendarIcon from '../components/Icons/CalendarIcon';
import GoalIcon from '../components/Icons/GoalIcon';

const stars = [
  { top: 76, left: '5%', width: 25 },
  { top: 50, left: '10%', width: 15 },
  { top: 30, left: '95%', width: 10 },
  { top: 80, left: '65%', width: 10 },
  { top: 250, left: '75%', width: 15 },
  { top: '85%', left: '5%', width: 25 },
  { top: '87%', left: '9%', width: 20 },
  { top: '95%', left: '3%', width: 10 },
];

const Home = () => (
  <div className="page-content home">
    <div className="home__wrapper">
      <div className="home__logo">
        <Logo />
      </div>
      <h1 className="home__title">Welcome</h1>
      <p className="home__text">Set your goals and plan your time effectively with ProPlanner</p>
      <div className="home__buttons-wrapper">
        <Link to="/" className="home__button" data-qa="set-goals-link">
          <GoalIcon />
          Goal Setter
        </Link>
        <Link to="/calendar" className="home__button" data-qa="calendar-link">
          <CalendarIcon />
          Calendar
        </Link>
      </div>
    </div>

    <div className="home__bcg1">
      <div className="home__bcg-monkey">
        <img src={monkey} alt="monkey" />
      </div>
      <img src={moon} className="home__bcg-moon" alt="moon" />
    </div>

    <CSSTransition in appear classNames="satellite" timeout={1000}>
      <div className="home__bcg2">
        <img src={satellite} className="home__bcg-satellite" alt="satellite" />
      </div>
    </CSSTransition>

    {stars.map((star, i) => (
      <CSSTransition key={i} in appear classNames="stars" timeout={400}>
        <img
          key={i}
          src={starImg}
          className="home__bcg3 home__bcg-star"
          style={{ top: star.top, left: star.left, width: star.width }}
          alt="star"
        />
      </CSSTransition>
    ))}
  </div>
);

export default Home;
