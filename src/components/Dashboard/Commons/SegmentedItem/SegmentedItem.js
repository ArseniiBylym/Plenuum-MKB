import React from 'react';
import './SegmentedItem.css';
import { NavLink } from 'react-router-dom';

const Segmented = (props) => {
  return(
    <li className='segmented-item' >
      <NavLink className="segmented-cell"
        to={props.option.path}
        activeClassName="active"
        >
          {props.option.title}
      </NavLink>
    </li>
  )
};

export default Segmented;
