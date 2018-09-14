import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import plus from 'assets/images/plus.svg';

const RoundButton = ({ to, dataQa }) => <Button to={to} data-qa={dataQa} />;

const Button = styled(Link)`
  width: 54px;
  height: 54px;
  background: url(${plus}) #3366b4 center center no-repeat;
  border-radius: 100%;
  box-shadow: inset 1px 1px 6px rgba(255, 255, 255, 0.12), 0px 4px 6px rgba(0, 0, 0, 0.2),
    -1px 1px 2px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  &:hover {
    background-color: #557db9;
  }
  @media (max-width: 768px) {
    position: fixed;
    bottom: 15px;
    right: 15px;
  }
`;
export default RoundButton;
