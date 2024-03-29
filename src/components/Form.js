import React, { useState } from 'react';

import '../css/Form.css';

const Form = () => {

  // Create local state to uppercase letters
  const [code, setCode] = useState('');

  return (
    <div id="form-container">
      <div className="wrap">
        <form id="form" action="https://60bpm.com/roaming-stones/" method="post">
          <div className="field-set">
            <label htmlFor="rocks-check">Enter the code found on the back of your stone below and click submit.</label>
            <input type="text" id="rocks-check" name="rocks_check" value={code} placeholder="Enter Code Here" onChange={(e) => setCode(e.target.value.toUpperCase())} />
          </div>
          <div className="field-set">
            <input id="submit-roaming-stone-code" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
