import React, { Component } from 'react';
import LocationIcon from 'assets/images/location-icon.svg';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  render() {
    const { view } = this.props;
    const viewMode = view ? 'list-item-view' : 'list-item';

    return (
      <div className={viewMode}>
        <div>
          <img src={LocationIcon} alt="LocationIcon" />
          <span className="list-item-main-text">
            <PlacesAutocomplete
              value={this.state.address}
              onChange={this.handleChange}
              onSelect={this.handleSelect}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <span>
                  <input
                    style={{
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '18px',
                      color: '#4d79bd',
                      backgroundColor: '#fff',
                    }}
                    {...getInputProps({
                      placeholder: 'Location',
                      className: 'location-search-input',
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                      const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </span>
              )}
            </PlacesAutocomplete>
          </span>
        </div>
      </div>
    );
  }
}

export default Location;
