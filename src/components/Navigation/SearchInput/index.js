import React from 'react';
import './styles.css';
import SearchIcon from './SearchIcon';

const SearchInput = () => (
  <div className="search">
    <input
      type="search"
      className="search__input"
      placeholder="Search..."
      aria-label="Search through site content"
    />
    <button className="search__btn" type="button">
      <SearchIcon />
    </button>
  </div>
);

export default SearchInput;
