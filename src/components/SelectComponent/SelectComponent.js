import React, { Component } from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';

import debounce from 'lodash.debounce';

import './styles.css';

const customStyles = {
  control: (styles, props) => ({
    ...styles,
    border: 'none',
    boxShadow: '#fff',
    padding: '6px',
    backgroundColor: props.selectProps.view ? '#FFFFFF' : ' #F9F9F9',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: props.selectProps.view ? '#FFFFFF' : '#ebebeb',
    },
  }),
  multiValue: styles => ({
    ...styles,
    backgroundColor: 'rgba(0, 188, 212, 0.1)',
    padding: '3px ',
  }),
  multiValueLabel: (styles, props) => ({
    ...styles,
    color: 'rgba(51, 102, 180, 0.87)',
    margin: props.selectProps.view ? '0 auto' : '',
  }),
  multiValueRemove: (styles, props) => ({
    ...styles,
    display: props.selectProps.view ? 'none' : 'flex',
  }),
  singleValue: styles => ({
    ...styles,
    transition: 'opacity 300ms',
  }),
  indicatorSeparator: (styles, props) => ({
    ...styles,
    backgroundColor: props.selectProps.view ? '#FFFFFF' : 'rgba(0, 0, 0, 0.12)',
  }),
  dropdownIndicator: (styles, props) => ({
    ...styles,
    color: props.selectProps.view ? '#FFFFFF' : 'rgba(0, 0, 0, 0.12)',
    '&:hover': {
      color: props.selectProps.view ? '#FFFFFF' : 'rgba(52, 70, 98, 0.87)',
    },
  }),
  option: (styles, { isSelected, isFocused }) => ({
    ...styles,
    color: isSelected ? 'white' : 'rgba(51, 102, 180, 0.87)',
    backgroundColor: isSelected ? '#00bcd4' : isFocused ? 'rgba(0, 188, 212, 0.1)' : null,
    cursor: 'pointer',
  }),
};

class SelectComponent extends Component {
  state = {
    page: 1,
    name: [],
  };

  componentDidMount = () => {
    const { restoreData } = this.props;
    restoreData();
    this.fetchData();
  };

  componentWillUnmount = () => {};

  componentWillReceiveProps = nextProps => {
    const { restoreData, filter, searchResult, loadData, numberOfCards } = this.props;

    if (nextProps.searchResult !== searchResult) {
      restoreData();
      loadData(1, numberOfCards, filter, nextProps.searchResult);
      this.setState(() => ({ page: 2 }));
    }
  };

  fetchData = () => {
    const { loadData, lastPageNumber, numberOfCards, filter, searchResult } = this.props;
    const { page } = this.state;
    if (page <= lastPageNumber) {
      loadData(page, numberOfCards, filter, searchResult);
      this.setState(prevState => ({ page: prevState.page + 1 }));
    }
  };

  changeHandle = e => {
    const { input } = this.props;
    input.onChange(e);
  };

  bottomHandler = () => {
    this.fetchData();
  };

  handleSearch = debounce(value => {
    const { search } = this.props;
    search(value);
  }, 500);

  render() {
    const { headerClass, headerContent, view, placeholder, options, ...restProps } = this.props;
    // const qwe = [
    //   {
    //     value: 1,
    //     label: 2,
    //   },
    // ];

    const normalizedOptions = options.map(option => ({
      value: option.id,
      label: option.attributes.title,
    }));

    return (
      <div>
        <p className={headerClass}>{headerContent}</p>
        <Select
          options={normalizedOptions}
          components={makeAnimated()}
          styles={customStyles}
          placeholder={placeholder}
          view={view}
          isDisabled={!!view}
          // value={qwe}
          onChange={this.changeHandle}
          onMenuScrollToBottom={this.bottomHandler}
          onInputChange={e => this.handleSearch(e)}
          maxMenuHeight={150}
          {...restProps}
        />
      </div>
    );
  }
}

export default SelectComponent;
