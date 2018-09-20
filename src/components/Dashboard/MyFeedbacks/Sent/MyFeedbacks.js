import React from 'react';
import './MyFeedbacks.css';

const MyFeedbacks = (props) => {
  return (
    <div className="myfeedbacks-main-container">
      {props.component}
    </div>
  );
};

export default MyFeedbacks;
