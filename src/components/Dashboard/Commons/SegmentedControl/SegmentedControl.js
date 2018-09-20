import React from 'react';
import './SegmentedControl.css';

const Segmented = (props) => {
  return(
    <ul className="nav navbar-nav nav-centered" onClick={props.handleClick}>
      {props.cells}
    </ul>
  );
};

export default Segmented;
