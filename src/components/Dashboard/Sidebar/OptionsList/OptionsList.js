import React from 'react';
import './OptionsList.css';

const OptionsList = (props) => {
  return (
    <div className="sidemenu-container">
      {props.options}
    </div>
  );
};

export default OptionsList;
