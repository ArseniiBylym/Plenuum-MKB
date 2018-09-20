import React from 'react';
import './TypeCell.css';

const TypeCell = (props) => {

  return (
    <div className={props.cellStyle} onClick={props.handleClick}>
      <div className='type-cell-single'>
        {props.image ? <img alt="" src={props.image}/> : undefined}
        <p>{props.text}</p>
        <div className="dropdown-type">
          <i className="fa fa-caret-down" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  );

}

export default TypeCell;
