import React from 'react';

const Stone = ({ stone }) => {
  return (
    <div className="stone">
      <div className="wrap">
        <div className="image">
          <img src={stone.image_url} />
        </div>
        <div className="info">
          <h3 className="title">{stone.title}</h3>
          <div className="location">{stone.location}</div>
        </div>
      </div>
    </div>
  );
}

export default Stone;
