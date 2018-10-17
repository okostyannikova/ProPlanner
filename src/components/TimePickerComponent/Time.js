import React, { Component } from 'react';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import { timeValidation } from 'utils/validate';
import { Field } from 'redux-form';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import timeField from './Time/timeField';

import './styles.css';

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
  state = { meta: null };

  validationHandler = meta => {
    // console.log(meta);
    this.setState({ meta });
  };

  selectStartDate = date => {
    // console.log('44', date);
  };

  render() {
    const { view } = this.props;
    const { meta } = this.state;
    // console.log(meta && Boolean(meta.error));
    // console.log(this.props);
    // console.log(this.state.meta);
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <MuiThemeProvider theme={materialTheme}>
          <div className="time-container">
            <p className="time-component">Time</p>
            <Field
              name="startTime"
              component={timeField}
              view={view}
              selectStartDate={this.selectStartDate}
              maxDate="2018-10-20 10:10"
              // maxDate={moment().format()}
              error={meta && Boolean(meta.error)}
            />
            <span className="separator" />
            <Field
              name="endTime"
              component={timeField}
              view={view}
              validate={[timeValidation]}
              validationHandler={this.validationHandler}
              error={meta && Boolean(meta.error)}
            />{' '}
            {meta ? meta.error && <div className="error-text">{meta.error}</div> : null}
          </div>
        </MuiThemeProvider>
      </MuiPickersUtilsProvider>
    );
  }
}
