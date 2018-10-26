import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import styled from 'styled-components';
import { filterOptions } from 'config';

const customStyles = {
  singleValue: base => ({
    ...base,
    color: '#3366B4',
    fontSize: 16,
    fontWeight: 'medium',
    marginLeft: 9,
  }),
  control: base => ({
    ...base,
    border: 'none',
    boxShadow: 'none',
    backgroundColor: '#fff',
  }),
  placeholder: () => ({
    color: '#3366B4',
    fontSize: 16,
    fontWeight: 'medium',
    marginLeft: 16,
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: () => ({
    color: '#96acd3',
    width: 10,
    marginRight: 21,
  }),
};

const FilterDropDown = ({ setFilter }) => (
  <StyledSelect
    options={filterOptions}
    isSearchable={false}
    placeholder="Filtering By"
    styles={customStyles}
    onChange={setFilter}
  />
);

FilterDropDown.propTypes = {
  setFilter: PropTypes.func.isRequired,
};

export default FilterDropDown;

const StyledSelect = styled(Select)`
  width: 170px;
  margin-left: auto;
  margin-right: 70px;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;
