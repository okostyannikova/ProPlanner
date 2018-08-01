import React, { Component } from 'react';
import styled from 'styled-components';
import googleLogo from './IconGoogle.svg';

const StyledButton = styled.button`
  display: inline-block;
  padding: 35px 107px 35px 197px;
  border: none;
  outline: none;
  margin: 78px 0 180px 0;
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

  &:before {
    content: url(${googleLogo});
    position: absolute;
    top: 50%;
    left: 91px;
    width: 70px;
    height: 42px;
    transform: translateY(-40%);
  }
`;

export default class Button extends Component {
  render() {
    return <StyledButton onClick={this.props.clickHandle}>SIGN UP USING GOOGLE+</StyledButton>;
  }
}
