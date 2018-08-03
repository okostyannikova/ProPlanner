import React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import './styles.css';
import fakeAuth from '../../utils/fakeAuth';
import Button from './Button.js';
import space from './Login_page_bg.png';
import logo from './Logo.svg';

const LogoText = styled.p`
  position: relative;
  padding-left: 70px;
  margin: 0;
  margin-bottom: 52px;

  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 24px;
  letter-spacing: 0.02em;
  color: #6a2789;

  &:before {
    content: url(${logo});
    position: absolute;
    top: 50%;
    left: 0;
    width: 70px;
    height: 42px;
    transform: translate(0%, -70%);
  }
`;

const Header = styled.h1`
  margin: 0;
  margin-bottom: 18px;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  font-size: 64px;
  letter-spacing: -0.01em;
  color: #344662;
`;

const Text = styled.p`
  margin: 0;
  margin-right: 5px;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  line-height: 25px;
  font-size: 18px;
  color: rgba(52, 70, 98, 0.8);
`;

const Link = styled.a`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 18px;
  text-decoration-line: underline;
  cursor: pointer;
  color: #00bcd4;
`;

class Login extends React.Component {
  state = {
    redirectToReferrer: false,
  };

  login = () => {
    console.log(123);
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div className="login">
        {/* <p>You must log in</p>
        <button onClick={this.login}>Log in</button> */}
        <div className="content">
          <LogoText>Pro planner</LogoText>

          <Header>Become a member</Header>

          <Text>
            Lorem ipsum dolor sit amet, sed do eiusmod tempor ut labore et dolore magna aliqua ut
            enim ad minim veniam.
          </Text>

          <Button clickHandle={this.login} />

          <div className="contentBottom">
            <Text>Lorem ipsum dolor sit amet, sed do eiusmod </Text>
            <Link>Lorem ipsum dolor</Link>
          </div>
        </div>

        <div className="imgWrapper">
          <img src={space} alt="space" width="570px" />
        </div>
      </div>
    );
  }
}

export default Login;
