import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import './styles.css';

const TimePickers = ({ handleStartDateChange, handleEndDateChange, start, end }) => (
  <div>
    <StyledDatePicker
      showTimeSelect
      showTimeSelectOnly
      selected={start}
      onChange={handleStartDateChange}
      timeFormat="HH:mm"
      dateFormat="HH:mm"
      timeCaption="Start"
    />
    <StyledDatePicker
      showTimeSelect
      showTimeSelectOnly
      selected={end}
      onChange={handleEndDateChange}
      timeFormat="HH:mm"
      dateFormat="HH:mm"
      timeCaption="End"
    />
  </div>
);

TimePickers.propTypes = {
  start: PropTypes.object.isRequired,
  end: PropTypes.object.isRequired,
  handleStartDateChange: PropTypes.func.isRequired,
  handleEndDateChange: PropTypes.func.isRequired,
};

export default TimePickers;

const StyledDatePicker = styled(DatePicker)`
  width: 158px;
  height: 49px;
  font-family: inherit;
  text-align: center;
  color: rgba(52, 70, 98, 0.87);
  font-size: 16px;
  border: none;
  background-color: #f9f9f9;
  margin-right: 32px;
  &:focus {
    outline: none;
  }
`;
