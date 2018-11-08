import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import debounce from 'lodash.debounce';

const SearchInput = ({ search }) => {
  const handleSearch = debounce(value => {
    search(value);
  }, 500);
  return (
    <Input
      className="searchInput"
      type="search"
      onChange={ev => {
        handleSearch(ev.target.value);
      }}
      placeholder="Search..."
    />
  );
};

SearchInput.propTypes = {
  search: PropTypes.func.isRequired,
};

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
    @media (max-width: 670px) {
      font-size: 12px;
    }
  }
  &:focus {
    outline: none;
    border: 2px solid '#3366B4';
  }
  @media (max-width: 670px) {
    font-size: 12px;
    width: 160px;
    height: 29px;
    order: 2;
    margin-right: 0;
  }
`;
