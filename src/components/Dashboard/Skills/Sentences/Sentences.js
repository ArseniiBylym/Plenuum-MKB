import React from 'react';
import './Sentences.css';

const Sentences = (props) => {
  return (
    <div className="full-container">
      {props.navigationBar}
      <div className="sentence-main-container" onClick={props.onClick}>
        {props.sentences}
      </div>
    </div>
  )
};

export default Sentences;
