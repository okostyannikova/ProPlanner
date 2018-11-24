import React, { Component } from 'react';
import * as moment from 'moment';
import { InlineDateTimePicker } from 'material-ui-pickers/DateTimePicker';

const styles = {
  timeFieldError: {
    borderBottom: '2px solid red',
  },
};

export default class timeField extends Component {
  state = { selectedDate: moment().format() };

  componentWillReceiveProps(newProps) {
    const { pickDate, input } = newProps;

    pickDate(newProps.input.value, input, 'auto');
  }

  handleDateChange = date => {
    const { input, pickDate } = this.props;

    input.onChange(moment(date).format());
    pickDate(moment(date).format(), input, input.name);
  };

  render() {
    const { view, selectedDate, error } = this.props;

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
            style={{
              ...(error ? styles.timeFieldError : ''),
            }}
          />
        )}
      </span>
    );
  }
}
