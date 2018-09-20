import React from 'react';
import './EmptyState.css';

const EmptyState = (props) => {

  return (
    <div className="empty-state-container">
      <img alt='' src={props.image}/>
      <p>{props.message}</p>      
    </div>
  );
}

export default EmptyState;
