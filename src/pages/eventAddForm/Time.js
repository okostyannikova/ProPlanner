import React, { Component } from 'react';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import { Field } from 'redux-form';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import timeField from './Time/timeField';

const materialTheme = createMuiTheme({
  overrides: {
    MuiFormControl: {
      root: {
        cursor: 'pointer',
        backgroundColor: '#F9F9F9',
        width: '140px',
        borderBottom: '2px solid transparent',
        padding: '10px 20px',
        transition: 'border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        '&:hover': {
          borderBottom: '2px solid #00BCD4',
        },
      },
    },
    MuiInput: {
      input: {
        color: 'rgba(51, 102, 180, 0.87)',
        cursor: 'pointer',
      },
      underline: {
        root: {
          '&:before': {
            borderBottom: 'none',
          },
        },
        '&:before': {
          borderBottom: 'none',
          content: '',
        },
        '&:after': {
          borderBottom: 'none',
        },
      },
    },
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: '#00BCD4',
      },
    },
    MuiPickerDTTabs: {
      tabs: {
        backgroundColor: '#00BCD4',
      },
    },
    MuiPickersDay: {
      day: {
        color: '#000',
      },
      selected: {
        backgroundColor: '#00BCD4',
      },
      current: {
        color: '#00BCD4',
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: '#00BCD4',
      },
    },
    MuiPickersClock: {
      pin: {
        backgroundColor: '#00BCD4',
      },
    },
    MuiPickersClockPointer: {
      pointer: {
        backgroundColor: '#00BCD4',
      },
      thumb: {
        backgroundColor: '#00BCD4',
        border: '14px solid #00BCD4',
      },
      noPoint: {
        backgroundColor: '#00BCD4',
      },
    },
  },
});

export default class Time extends Component {
  state = {};

  render() {
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <MuiThemeProvider theme={materialTheme}>
          <div className="time-container">
            <p className="time-component">Time</p>
            <Field name="startTime" component={timeField} />
            <span className="separator" />
            <Field name="endTime" component={timeField} />{' '}
          </div>
        </MuiThemeProvider>
      </MuiPickersUtilsProvider>
    );
  }
}
