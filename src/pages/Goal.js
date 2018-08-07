import React from 'react';

const Goal = ({ match }) => (
  <div className="page-content">
    <p>Goal {match.params.id}</p>
  </div>
);

export default Goal;
