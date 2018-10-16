import React from 'react';
import './FeedbackCard.css';
import moment from 'moment';

const FeedbackCard = (props) => {
  return (
    <div className="feedback-container" onClick={props.onClick}>
      <div className="feedback-wing-overlap" style={{backgroundColor: props.type.color}}>
        <img alt="" src={props.type.image} />
      </div>
      <div className="feedback-content-container">
        <div className="feedback-content">
          <p className="feedback-content-message">{props.feedback.message}</p>
          <p className="feedback-content-context">{props.feedback.context}</p>
          {props.tags}
        </div>
        <div className="feedback-content-date">
          {moment(props.feedback.createdAt).utc().format('YYYY.MM.DD • HH.mm')}
        </div>
        {props.cardIcons}
      </div>
    </div>
  );
};

export default FeedbackCard;
