import React from 'react';
import PropTypes from 'prop-types';
import { typesOptions } from 'config';
import { minutesToCivilTime } from 'utils/helpers';

const Summary = ({ summary, workingTime }) => {
  const width = num => `${(num * 100) / workingTime}%`;

  return (
    <div className="calendar-day__summary">
      {Object.keys(summary)
        .sort((a, b) => summary[b] - summary[a])
        .map((type, i, arr) => (
          <div
            className="calendar-day__summary-item"
            key={type}
            style={{
              width: width(summary[type]),
              backgroundColor: typesOptions[type],
              zIndex: arr.length - i,
            }}
            title={`${type} ${minutesToCivilTime(summary[type])}h`}
          />
        ))}
    </div>
  );
};

Summary.propTypes = {
  summary: PropTypes.object.isRequired,
  workingTime: PropTypes.number.isRequired,
};

export default Summary;
