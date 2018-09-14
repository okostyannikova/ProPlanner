import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Priority from './dropsContainer/Priority.js';
import Notification from './dropsContainer/Notification.js';
import Location from './dropsContainer/Location.js';
import Type from './dropsContainer/Type.js';

// Выровнять иконки по центру текста

class DropsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { view } = this.props;

    const mainButtonStyle = view
      ? {
          borderRadius: '2px',
          width: '130px',
          height: '36px',
          marginRight: '24px',
          background:
            'linear-gradient(0deg, rgba(0, 188, 212, 0.1), rgba(0, 188, 212, 0.1)), #FFFFFF',
          color: '#00BCD4',
          boxShadow: '0px 2px 2px rgba(0, 188, 212, 0.24), 0px 0px 2px rgba(0, 188, 212, 0.12)',
        }
      : {
          borderRadius: '2px',
          width: '130px',
          height: '36px',
          marginRight: '24px',
          background: '#00BCD4',
          color: '#FFFFFF',
          boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12)',
        };

    const secondaryButtonStyle = view
      ? {
          borderRadius: '2px',
          width: '130px',
          height: '36px',
          marginRight: '24px',
          background:
            'linear-gradient(0deg, rgba(246, 129, 129, 0.1), rgba(246, 129, 129, 0.1)), #FFFFFF',
          color: '#F68181',
          boxShadow: '0px 2px 2px rgba(246, 129, 129, 0.24), 0px 0px 2px rgba(246, 129, 129, 0.12)',
        }
      : {
          borderRadius: '2px',
          width: '130px',
          height: '36px',
          marginRight: '24px',
          background:
            'linear-gradient(0deg, rgba(52, 70, 98, 0.15), rgba(52, 70, 98, 0.15)), #FFFFFF',
          color: 'rgba(52, 70, 98, 0.5)',
          boxShadow: '0px 2px 2px rgba(52, 70, 98, 0.24), 0px 0px 2px rgba(52, 70, 98, 0.12)',
        };

    const mainButtonText = view ? 'EDIT' : 'SAVE';
    const secondaryButtonText = view ? 'DELETE' : 'CANCEL';

    return (
      <div>
        <ul className="drops-list">
          <li>
            <Priority view={view} />
          </li>
          <li>
            <Notification view={view} />
          </li>
          <li>
            <Location view={view} />
          </li>
          <li>
            <Type view={view} />
          </li>
        </ul>
        <Button
          variant="contained"
          color="primary"
          style={mainButtonStyle}
          className="drops-list-button"
        >
          {mainButtonText}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={secondaryButtonStyle}
          className="drops-list-button"
        >
          {secondaryButtonText}
        </Button>
      </div>
    );
  }
}

export default DropsContainer;
