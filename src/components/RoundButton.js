import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import plus from 'assets/images/plus.svg';

const RoundButton = ({ to, type }) => <Button to={to} data-qa={`add-${type}-btn`} type={type} />;

const Button = styled(Link)(
  ({ type }) => css`
  position: relative;
  z-index: 10;
  width: 54px;
  height: 54px;
  background: url(${plus}) #3366b4 center center no-repeat;
  border-radius: 100%;
  box-shadow: inset 1px 1px 6px rgba(255, 255, 255, 0.12), 0px 4px 6px rgba(0, 0, 0, 0.2),
    -1px 1px 2px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  &::before {
    opacity: 0;
    position: absolute;
    z-index: -10;
    content: 'Create ${type}';
    top: 17px;
    right: 50px;
    font-size: 12px;
    font-weight: 300;
    color: #fff;
    padding: 3px 5px;
    white-space: nowrap;
    background-color: #595757c2;
    border-radius: 2px;
    transition: opacity 300ms ease-in-out, right 300ms ease-in-out;
  }
  &:hover {
    background-color: #557db9;
  }
  &:hover::before {
    opacity: 1;
    right: 60px;
    transition: opacity 100ms ease-in-out, right 300ms ease-in-out;
    transition-delay: 300ms;
  }
  @media (max-width: 768px) {
    position: fixed;
    bottom: 15px;
    right: 15px;
    z-index: 5;
  }
 `
);

RoundButton.propTypes = {
  to: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default RoundButton;
