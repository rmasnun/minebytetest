// Accomplishments.js
import React from 'react';

const accomplishments = [
  { language: 'C++', certificate: 'Passed' },
  { language: 'Python', certificate: 'Passed' },
];

const Accomplishments = () => (
  <div className="accomplishments"style={{ marginTop: '50px' }}>
    {accomplishments.map((accomplishment, index) => (
      <div key={index} className="accomplishment">
        {accomplishment.language}: {accomplishment.certificate}
      </div>
    ))}
  </div>
);

export default Accomplishments;
