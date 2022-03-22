import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div id="page">
        <div id="header">
          <div className="wrap">
            <h1>60bpm :: Roaming Stones</h1>
            <p>Decorated stones with unique codes have been distributed around the country. If you've found one, fill-out the form below to learn about the stone's journey so far and add your own story to the mix.</p>
          </div>
        </div>
        <div id="form-container">
          <div className="wrap">
            <form id="form" action="http://sixtybpm-local:8888/roaming-stones/" method="post">
              <div className="field-set">
                <label htmlFor="rocks-check">Enter the code found on the back of your stone below and click the submit button:</label>
                <input type="text" id="rocks-check" name="rocks_check" />
                <div className="notes">Charcters are either <strong>numbers</strong> or <strong>capitalized letters</strong>.</div>
              </div>
              <div className="field-set">
                <input type="submit" value="Submit" />
              </div>
            </form>
          </div>
        </div>
        <div className="stone-container">
          <div className="wrap">
            <h2>Currently Circulating Stones</h2>
            <div className="stone-grid">
              [Stone Grid Here]
            </div>
          </div>
        </div>
        <div id="footer">
          <div className="wrap">
            <p>Copyright &copy; 2022 60bpm.com</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
