import React from 'react';
import './styles.css';

const SearchInput = () => (
  <div className="search">
    <input
      type="search"
      className="search__input"
      placeholder="Search..."
      aria-label="Search through site content"
    />
  </div>
);

export default SearchInput;
