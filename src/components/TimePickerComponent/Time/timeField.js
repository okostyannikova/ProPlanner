import React, { Component } from 'react';
import * as moment from 'moment';
import { InlineDateTimePicker } from 'material-ui-pickers/DateTimePicker';

const styles = {
  timeField: {
    borderBottom: '2px solid transparent',
    '&:hover': {
      borderBottom: '2px solid #00BCD4',
    },
  },
  timeFieldError: {
    borderBottom: '2px solid red',
  },
};

export default class timeField extends Component {
  state = { selectedDate: moment().format() };

  componentWillReceiveProps(newProps) {
    // console.log(newProps);
    // console.log(this.props);
    const { meta } = newProps;
    const { validationHandler } = this.props;
    // meta.error && validationHandler(meta);
    validationHandler && validationHandler(meta);
    this.setState({ selectedDate: newProps.input.value });
  }

  handleDateChange = date => {
    const { input } = this.props;
    input.onChange(moment(date).format());
    this.setState({ selectedDate: date });
  };

  render() {
    const { selectedDate } = this.state;
    const { view, selectStartDate, maxDate, maxDateMessage, error } = this.props;

    // console.log('11', error);
    // // selectStartDate(selectedDate);
    selectStartDate && selectStartDate(selectedDate);
    console.log(styles);
    return (
      <span>
        {view ? (
          <span>
            <span className="date" onClick={this.openPicker}>
              {moment(selectedDate).format('D MMM YYYY')}{' '}
              <span className="time">{moment(selectedDate).format('HH:mm')}</span>
            </span>
          </span>
        ) : (
          <InlineDateTimePicker
            value={selectedDate}
            onChange={this.handleDateChange}
            ampm={false}
            format="D MMM YYYY  HH:mm"
            maxDate={maxDate}
            maxDateMessage={maxDateMessage}
            className="qqqq"
            style={{
              ...styles.timeField,
              ...(error ? styles.timeFieldError : styles.timeField),
            }}
          />
        )}
      </span>
    );
  }
}
