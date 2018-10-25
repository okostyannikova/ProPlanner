import React from 'react';
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
  clearIndicator: base => ({
    ...base,
    color: 'rgba(0, 0, 0, 0.3);',
    padding: '8px 0',
    width: 18,
  }),
};

const FilterDropDown = () => (
  <StyledSelect
    options={filterOptions}
    isClearable
    isSearchable={false}
    placeholder="Filtering By"
    styles={customStyles}
  />
);

export default FilterDropDown;

const StyledSelect = styled(Select)`
  width: 170px;
  margin-left: auto;
  margin-right: 70px;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;
