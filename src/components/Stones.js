import React from 'react';
import Stone from './Stone';

const Stones = ({ stones }) => {
  return (
    <div className="section stone-container">
      <div className="wrap">
        <h2>Currently Circulating Stones</h2>
        <p>The following stones have been distributed and are either waiting to be discovered or in someone's possession.</p>
        <div className="stone-grid">
          {stones.map((stone, index) => {
            const image_url = 'spacer.gif';
            return (
              <Stone key={index} stone={stone} />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Stones;
