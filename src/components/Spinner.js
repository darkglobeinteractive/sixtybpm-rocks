import React from 'react';

import '../css/Spinner.css';

const Spinner = ({ message }) => {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <div className="caption">{message}</div>
    </div>
  );
}

export default Spinner;
