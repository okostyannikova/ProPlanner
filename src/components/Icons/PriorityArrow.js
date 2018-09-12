import React from 'react';

const PriorityArrow = props => {
  const { fill, direction = 0 } = props;

  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M-2.62268e-07 6L1.05 7.05L5.25 2.85L5.25 12L6.75 12L6.75 2.85L10.95 7.05L12 6L6 -4.07697e-06L-2.62268e-07 6Z"
        fill={fill}
        transform={`rotate(${direction},6,6)`}
      />
    </svg>
  );
};

export default PriorityArrow;
