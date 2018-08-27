import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import googleLogo from 'assets/images/IconGoogle.svg';
import './styles.css';

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

  &:hover {
    background-color: #dd4b4b;
  }

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

const SpanContainer = styled.span`
  position: relative;
  height: 50px;
  background-image: none;
  border: none;
  outline: none;
  background-color: #f56464;
  color: white;
  text-transform: uppercase;
  font-size: 20px;
  letter-spacing: 2px;
  cursor: pointer;
  border-radius: 50px;
  border: none;
  outline: none;
  width: 50px;
  background: linear-gradient(180deg, rgba(225, 97, 81, 0.5) 0%, rgba(232, 133, 121, 0) 100%),
    #dd4b39;
`;

const StyledSpan = styled.span`
  display: block;
  width: 34px;
  height: 34px;
  position: absolute;
  top: 8px;
  left: calc(50% - 17px);
  background: transparent;
  box-sizing: border-box;
  border-top: 4px solid white;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-radius: 100%;
  animation: spin 0.6s ease-out infinite;
`;

const spin = keyframes`
  100% {transform: rotate(360deg)}
`;

export default class Button extends Component {
  render() {
    const { loading, clickHandle } = this.props;
    if (loading) {
      return (
        <button className="button loading">
          <span className="spinner" />
        </button>
      );
    }
    return <StyledButton onClick={clickHandle}>SIGN UP USING GOOGLE+</StyledButton>;
  }
}

// (
//   <SpanContainer>
//     <StyledSpan />
//   </SpanContainer>
// );
