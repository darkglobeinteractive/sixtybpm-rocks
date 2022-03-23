import React from 'react';

const Form = () => {
  return (
    <div id="form-container">
      <div className="wrap">
        <form id="form" action="https://60bpm.com/roaming-stones/" method="post">
          <div className="field-set">
            <label htmlFor="rocks-check">Enter the code found on the back of your stone below:</label>
            <input type="text" id="rocks-check" name="rocks_check" />
            <div className="notes">Charcters are either <strong>numbers</strong> or <strong>capitalized letters</strong>.</div>
          </div>
          <div className="field-set">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
