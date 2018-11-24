import React, { Component } from 'react';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import * as moment from 'moment';
// import { timeValidation, startTimeValidation, startTimeCheck } from 'utils/validate';
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
        '@media (max-width:575.98px)': {
          width: '100%',
          boxSizing: 'border-box',
          marginBottom: '10px',
          padding: '0',
          height: '40px',
        },
      },
    },
    MuiInput: {
      input: {
        color: 'rgba(51, 102, 180, 0.87)',
        cursor: 'pointer',
        '@media (max-width:575.98px)': {
          padding: 0,
          textAlign: 'center',
          lineHeight: '40px',
        },
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
  state = {
    meta: null,
    autoStartDate: moment().format(),
    autoEndDate: moment()
      .add(30, 'minutes')
      .format(),
    startDateInput: null,
    endDateInput: null,
  };

  validationHandler = meta => {
    this.setState({ meta });
  };

  selectStartDate = (date, input, name) => {
    const { autoEndDate, startDateInput, endDateInput } = this.state;

    if (moment(autoEndDate).diff(moment(date), 'minutes') < 30) {
      if (startDateInput && endDateInput && name === 'startTime') {
        endDateInput.onChange(
          moment(date)
            .add(30, 'minutes')
            .format()
        );
      }
      this.setState({
        autoStartDate: moment(date).format(),
        autoEndDate: moment(date)
          .add(30, 'minutes')
          .format(),
      });
    } else {
      this.setState({ autoStartDate: moment(date).format(), startDateInput: input });
    }
  };

  selectEndDate = (date, input, name) => {
    const { autoStartDate, startDateInput, endDateInput } = this.state;

    if (moment(date).diff(moment(autoStartDate), 'minutes') < 30) {
      if (endDateInput && name === 'auto') {
        return;
      }
      if (startDateInput && endDateInput && name === 'endTime') {
        startDateInput.onChange(
          moment(date)
            .subtract(30, 'minutes')
            .format()
        );
      }
      this.setState({
        autoEndDate: moment(date).format(),
        autoStartDate: moment(date)
          .subtract(30, 'minutes')
          .format(),
      });
    } else {
      this.setState({ autoEndDate: moment(date).format(), endDateInput: input });
    }
  };

  render() {
    const { view } = this.props;
    const { meta, autoStartDate, autoEndDate } = this.state;

    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <MuiThemeProvider theme={materialTheme}>
          <div className="time-container">
            <p className="time-component">Time</p>
            <Field
              name="startTime"
              component={timeField}
              view={view}
              error={meta && Boolean(meta.error)}
              selectedDate={autoStartDate}
              pickDate={this.selectStartDate}
            />
            <span className="separator" />
            <Field
              name="endTime"
              component={timeField}
              view={view}
              validationHandler={this.validationHandler}
              error={meta && Boolean(meta.error)}
              selectedDate={autoEndDate}
              pickDate={this.selectEndDate}
            />{' '}
            {meta ? meta.error && <div className="error-text">{meta.error}</div> : null}
          </div>
        </MuiThemeProvider>
      </MuiPickersUtilsProvider>
    );
  }
}
