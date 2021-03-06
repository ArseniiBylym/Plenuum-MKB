import React from 'react';

import './Privacy.css'

const Privacy = (props) => {
  return (
      <div className="privacy-container margin-top-1">
          <div className="privacy-checkbox">
              <input
                  type="checkbox"
                  id='anonimity'
                  name="anonimity"
                  onChange={props.handleChange}
              />
              <label htmlFor="anonimity">Send anonymous</label>
          </div>

      </div>
  );
};

export default Privacy;