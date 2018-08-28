import React, { Component } from 'react';
import styled from 'styled-components';
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

  background: ${props => (props.loading ? 'transparent' : '#dd4b39')};
  box-shadow: ${props => (props.loading ? 'none' : '0px 4px 6px rgba(0, 0, 0, 0.15)')};
  border-radius: 10px;

  transition: all 0.2s ease-out;

  &:hover {
    background-color: ${props => (props.loading ? 'transparent' : '#c93e3e')};
  }

  &:active {
    background-color: ${props => (props.loading ? 'transparent' : '#bf2424')};
  }

  @media (min-width: 768px) {
    margin: 40px 0 90px 0;
    padding: 20px 49px 20px 25%;
    text-align: left;
    max-width: 470px;

    &:before {
      display: ${props => (props.loading ? 'none' : 'block')};
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

const StyledSpan = styled.span`
  display: block;
  width: 50px;
  height: 50px;
  position: absolute;
  top: 8px;
  left: calc(50% - 17px);
  background: transparent;
  box-sizing: border-box;
  border-top: 4px solid #c93e3e;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-radius: 100%;
  animation: spin 0.8s ease-out infinite;

  @media (min-width: 768px) {
    width: 60px;
    height: 60px;
  }

  @media (min-width: 1200px) {
    width: 80px;
    height: 80px;
  }
`;

export default class Button extends Component {
  render() {
    const { loading, clickHandle } = this.props;

    return (
      <StyledButton onClick={clickHandle} loading={loading}>
        {loading ? <StyledSpan /> : 'SIGN UP USING GOOGLE+'}
      </StyledButton>
    );
  }
}
