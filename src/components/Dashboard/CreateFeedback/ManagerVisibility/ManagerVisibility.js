import React from 'react';

import './ManagerVisibility.css'

const ManagerVisibility = (props) => {
  return (
      <div className="privacy-container margin-top-1">
          <div className="privacy-checkbox">
              <input
                  type="checkbox"
                  id='managerVisibility'
                  name="managerVisibility"
                  onChange={props.handleChange}
                  checked={props.isChecked ? true : false}
              />
              <label htmlFor="managerVisibility">Visible to your manager</label>
          </div>

      </div>
  );
};

export default ManagerVisibility;