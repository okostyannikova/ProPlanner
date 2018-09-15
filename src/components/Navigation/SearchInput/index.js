import React from 'react';
import './styles.css';
import SearchIcon from '../../Icons/SearchIcon';

const SearchInput = () => (
  <div className="search">
    <input
      type="search"
      className="search__input"
      data-qa="search-int"
      placeholder="Search..."
      aria-label="Search through site content"
    />
    <button className="search__btn" data-qa="search-btn" type="button">
      <SearchIcon />
    </button>
  </div>
);

export default SearchInput;
