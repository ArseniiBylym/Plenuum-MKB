
import React from 'react';
import './OptionsCell.css';
import { NavLink} from 'react-router-dom';

const OptionsCell = (props) => {
  return (
    <div className="options-container col-sm-12">
      <NavLink className="options-name"
        to={{pathname: props.item.path}}
        activeClassName="active"
        onClick={props.onClick}
        >
          <div className={props.item.class}></div>
          {props.item.title}
      </NavLink>
    </div>
  );
};

export default OptionsCell;
