import React from 'react';

const Stone = ({ stone }) => {
  return (
    <div className="stone">
      <div className="wrap">

        <div className="title">{stone.title}</div>
        <div className="location">{stone.location}</div>
      </div>
    </div>
  );
}

export default Stone;
