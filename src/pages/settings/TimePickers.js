import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import './styles.css';
import moment from 'moment';

const TimePickers = ({ handleStartDateChange, handleEndDateChange, start, end, error }) => (
  <div>
    <StyledDatePicker
      showTimeSelect
      showTimeSelectOnly
      selected={start}
      onChange={handleStartDateChange}
      timeFormat="HH:mm"
      dateFormat="HH:mm"
      timeCaption="Start"
      minTime={moment()
        .hours(0)
        .minutes(0)}
      maxTime={end}
    />
    <StyledDatePicker
      showTimeSelect
      showTimeSelectOnly
      selected={end}
      onChange={handleEndDateChange}
      timeFormat="HH:mm"
      dateFormat="HH:mm"
      timeCaption="End"
      minTime={start}
      maxTime={moment()
        .hours(23)
        .minutes(30)}
    />
    <ErrorMessage>
      {error && 'Must be at least 8 hours between the start and the end.'}
    </ErrorMessage>
  </div>
);

TimePickers.propTypes = {
  start: PropTypes.object.isRequired,
  end: PropTypes.object.isRequired,
  handleStartDateChange: PropTypes.func.isRequired,
  handleEndDateChange: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
};

export default TimePickers;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  height: 49px;
  font-family: inherit;
  text-align: center;
  color: rgba(52, 70, 98, 0.87);
  font-size: 16px;
  border: none;
  background-color: #f9f9f9;
  &:focus {
    outline: none;
  }
`;

const ErrorMessage = styled.p`
  font-size: 12px;
  color: #db4437;
  min-height: 14px;
  margin-top: 5px;
  margin-bottom: 0;
`;
