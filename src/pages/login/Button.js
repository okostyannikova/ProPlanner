import React, { Component } from 'react';
import styled from 'styled-components';
import googleLogo from 'assets/images/IconGoogle.svg';

const StyledButton = styled.button`
  display: inline-block;
  padding: 20px 0;
  text-align: center;
  width: 100%;
  max-width: 540px;
  border: none;
  outline: none;
  margin: 40px auto 90px auto;
  color: #ffffff;
  text-transform: uppercase;
  position: relative;
  cursor: pointer;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  font-size: 18px;
  letter-spacing: 0.07em;

  background: linear-gradient(180deg, rgba(225, 97, 81, 0.5) 0%, rgba(232, 133, 121, 0) 100%),
    #dd4b39;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.15);
  border-radius: 10px;

  @media (min-width: 768px) {
    margin: 40px 0 90px 0;
    padding: 20px 49px 20px 25%;
    text-align: left;
    max-width: 470px;

    &:before {
      display: block;
      left: 7%;
      transform: scale(0.8) translateY(-50%);
      content: url(${googleLogo});
      position: absolute;
      top: 50%;
      width: 70px;
      height: 42px;
    }
  }

  @media (min-width: 1200px) {
    max-width: 540px;
    margin: 78px 0 210px;
    padding: 35px 40px 35px 180px;

    &:before {
      left: 17%;
      transform: translateY(-40%);
    }
  }
`;

export default class Button extends Component {
  render() {
    return <StyledButton onClick={this.props.clickHandle}>SIGN UP USING GOOGLE+</StyledButton>;
  }
}
