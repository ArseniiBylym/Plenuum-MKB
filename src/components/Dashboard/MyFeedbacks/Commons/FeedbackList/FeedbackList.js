import React from 'react';
import './FeedbackList.css';

const FeedbackList = (props) => {
  return (
    <div className="feedback-list-container">
      {props.feedbackscard}
    </div>
  );
};

export default FeedbackList;
