import React from 'react';

const DaysLabels = () => {
  const daysLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return (
    <tr className="days-labels">
      {daysLabels.map(day => (
        <th key={day}>{day}</th>
      ))}
    </tr>
  );
};

export default DaysLabels;
