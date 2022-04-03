import React from 'react';

import '../css/Stones.css';
import Spinner from './Spinner.js';
import Stone from './Stone';

class Stones extends React.Component {

  // Render the stones grid
  renderStonesGrid(stones) {
    return stones.map((stone, index) => {
      return (
        <Stone key={index} stone={stone} />
      );
    });
  }

  // Render the stones or the spinner if the stones haven't been fetched yet
  renderStones(stones) {
    if (stones.length === 0) {
      return <Spinner message="...loading..." />
    } else {
      return (
        <div>
          <p>The following stones have been distributed and are either waiting to be discovered or in someone's possession.</p>
          <div className="stone-grid">
            {this.renderStonesGrid(stones)}
          </div>
        </div>
      );
    }
  }

  render() {

    return (
      <div className="section stone-container">
        <div className="wrap">
          <h2>Currently Circulating Stones</h2>
          {this.renderStones(this.props.stones)}
        </div>
      </div>
    );

  }

}

export default Stones;
