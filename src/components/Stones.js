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
          <p>Roaming stones are decorated stones--each containing the URL of this site and a unique code--that have been distributed around the world for people to discover and then (hopefully) hide again for someone else to find. If you've found one of our stones, please submit the code above to learn about its travels and tell us about your discovery. Below is a gallery of the roaming stones that are currently in circulation.</p>
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
          <h2>About the Roaming Stones</h2>
          {this.renderStones(this.props.stones)}
        </div>
      </div>
    );

  }

}

export default Stones;
