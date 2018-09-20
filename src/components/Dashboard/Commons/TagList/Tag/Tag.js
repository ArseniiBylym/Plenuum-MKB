import React from 'react';
import './Tag.css';

const Tag = (props) => {

  return (
    <div className={props.myStyle} onClick={props.tagClicked}>
      <p>{props.title}</p>
    </div>
  )
};

export default Tag;
