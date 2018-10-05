import React, { Component } from 'react';
import * as moment from 'moment';
import { InlineDateTimePicker } from 'material-ui-pickers/DateTimePicker';

export default class timeField extends Component {
  state = { selectedDate: moment().format() };

  componentWillReceiveProps(newProps) {
    this.setState({ selectedDate: newProps.input.value });
  }

  handleDateChange = date => {
    const { input } = this.props;
    input.onChange(moment(date).format());
    this.setState({ selectedDate: date });
  };

  render() {
    const { selectedDate } = this.state;

    return (
      <span>
        <InlineDateTimePicker
          value={selectedDate}
          onChange={this.handleDateChange}
          ampm={false}
          format="D MMM YYYY  HH:mm"
        />
      </span>
    );
  }
}
