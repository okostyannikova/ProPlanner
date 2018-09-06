import React, { Component } from 'react';
import { DateRangePicker, i18n } from 'element-react';
import * as moment from 'moment';

import 'element-theme-default';
import locale from 'element-react/src/locale/lang/en';

i18n.use(locale);

export default class Time extends Component {
  constructor(props) {
    super(props);
    this.state = { value1: '' };
  }

  render() {
    const { value1 } = this.state;

    return (
      <div className="time-container">
        <p className="time-component">Time</p>
        <div
          className="source"
          style={{
            opacity: '.3',
            position: 'relative',
            width: '400px',
            height: '50px',
          }}
        >
          <div className="block">
            <span className="demonstration" />
            <DateRangePicker
              isShowTime
              firstDayOfWeek="1"
              value={value1}
              placeholder="Pick a range"
              onChange={date => {
                this.setState({ value1: date });
              }}
            />
          </div>
        </div>
        <span className="date">{moment(value1[0]).format('D MMM YYYY')}</span>
        <span className="time">{moment(value1[0]).format('HH:mm')}</span>
        <span className="separator" />
        <span className="date">{moment(value1[1]).format('D MMM YYYY')}</span>
        <span className="time">{moment(value1[1]).format('HH:mm')}</span>
      </div>
    );
  }
}
