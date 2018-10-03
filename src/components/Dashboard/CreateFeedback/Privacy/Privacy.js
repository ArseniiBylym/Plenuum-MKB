import React from 'react';

import './Privacy.css'

const Privacy = (props) => {
    // console.log(props)
  return (
      <div className="privacy-container margin-top-1">
          <div className="privacy-checkbox">
              <input
                  type="checkbox"
                  id='anonimity'
                  name="anonimity"
                  onChange={props.handleChange}
              />
              <label htmlFor="anonimity">Küldés névtelenül</label>
          </div>

      </div>
  );
};

export default Privacy;