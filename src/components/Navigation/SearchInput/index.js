import React from 'react';
import PropTypes from 'prop-types';
import WithOpenHandler from 'components/hocs/WithOpenHandler';
import SearchIcon from '../../Icons/SearchIcon';
import './styles.css';

const SearchInput = ({ isOpen, setButtonRef, setWrapperRef }) => (
  <div className="search">
    <input
      type="search"
      className={`search__input ${isOpen ? 'search__input--show' : 'search__input--hidden'}`}
      data-qa="search-int"
      placeholder="Search..."
      aria-label="Search through site content"
      ref={setWrapperRef}
    />
    <button className="search__btn" data-qa="search-btn" type="button" ref={setButtonRef}>
      <SearchIcon />
    </button>
  </div>
);

SearchInput.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setButtonRef: PropTypes.func.isRequired,
  setWrapperRef: PropTypes.func.isRequired,
};

export default WithOpenHandler(SearchInput);
