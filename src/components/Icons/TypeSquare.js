import React from 'react';
import PropTypes from 'prop-types';

const TypeSquare = props => {
  const { fill } = props;

  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="18" height="18" fill={fill} />
    </svg>
  );
};

TypeSquare.propTypes = {
  fill: PropTypes.string.isRequired,
};

export default TypeSquare;
