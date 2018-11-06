import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const SearchInput = () => <Input type="search" placeholder="Search" />;

export default SearchInput;

const Input = styled.input`
  width: 220px;
  height: 38px;
  font-family: inherit;
  color: rgb(51, 102, 180);
  font-size: 16px;
  padding: 2px 10px 2px 24px;
  margin-left: auto;
  margin-right: 20px;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  &::placeholder {
    font-family: inherit;
    font-size: 16px;
    color: rgb(51, 102, 180);
  }
  &:focus {
    outline: none;
    border: 2px solid '#3366B4';
  }
`;
