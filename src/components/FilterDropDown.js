import React from 'react';
import PropTypes from 'prop-types';
import Select, { components } from 'react-select';
import styled from 'styled-components';
import { filterOptions } from 'config';

const customStyles = {
  container: base => ({
    ...base,
    display: 'inline-block',
    '@media (max-width: 670px)': {
      minHeight: '29px !important',
    },
  }),
  valueContainer: base => ({
    ...base,
    padding: '2px 2px 2px 8px',
    '@media (max-width: 670px)': {
      fontSize: 12,
      minHeight: '29px !important',
    },
  }),
  singleValue: base => ({
    ...base,
    color: '#3366B4',
    fontSize: 18,
    fontWeight: 'medium',
    marginLeft: 9,
  }),
  control: base => ({
    ...base,
    border: 'none',
    boxShadow: 'none',
    backgroundColor: '#fff',
    '@media (max-width: 670px)': {
      minHeight: '29px !important',
    },
  }),
  placeholder: () => ({
    color: '#3366B4',
    fontSize: 16,
    fontWeight: 'medium',
    marginLeft: 16,
    '@media (max-width: 670px)': {
      fontSize: 12,
    },
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  clearIndicator: base => ({
    ...base,
    padding: 2,
    width: 20,
  }),
  dropdownIndicator: () => ({
    color: '#96acd3',
    width: 10,
    marginRight: 21,
    '@media (max-width: 670px)': {
      width: 8,
    },
  }),
  multiValueRemove: base => ({
    ...base,
    ':hover': {
      backgroundColor: '#3366b4',
      color: 'white',
    },
  }),
  option: base => ({
    ...base,
    '@media (max-width: 670px)': {
      fontSize: 12,
    },
  }),
};

const CustomValueContainer = ({ children, ...props }) => {
  if (children[0].length) {
    const newChilds = children[0].map(child =>
      React.cloneElement(child, { key: child.props.children })
    );
    newChilds.forEach((newChild, index) => {
      children[0][index] = newChild;
    });
  }
  return <components.ValueContainer {...props}>{children}</components.ValueContainer>;
};

const FilterDropDown = ({ setFilter, filter }) => (
  <StyledSelect
    options={filterOptions}
    isSearchable={false}
    placeholder="Filtering By"
    styles={customStyles}
    onChange={setFilter}
    value={filter}
    isMulti
    components={{
      ValueContainer: CustomValueContainer,
    }}
  />
);

FilterDropDown.defaultProps = {
  filter: [],
};

FilterDropDown.propTypes = {
  setFilter: PropTypes.func.isRequired,
  filter: PropTypes.array,
};

CustomValueContainer.propTypes = {
  children: PropTypes.array.isRequired,
};

export default FilterDropDown;

const StyledSelect = styled(Select)`
  width: 220px;
  margin-right: 60px;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    margin-right: 0;
  }
  @media (max-width: 670px) {
    margin-left: auto;
    width: 160px;
  }
`;
