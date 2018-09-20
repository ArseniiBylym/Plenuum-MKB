import React from 'react';
import './SentRequestCard.css';

const SentRequestCard = (props) => {

  return (
    <div className="sentRequest-container" onClick={props.onClick}>
      <div className="sentRequest-top-container">
        <div
          className="sentRequest-wing-overlap"
          style={{
          backgroundColor: props.type.color
        }}>
          <img alt="" src={props.type.image}/>
        </div>
        <div className="sentRequest-content-container">
          <div className="sentRequest-content">
            <p className="sentRequest-content-message">{props.request.requestMessage}</p>
            <p className="sentRequest-content-recipient">{props.userNames}</p>
          </div>
        </div>
      </div>
      <div className='col-sm-10'></div>
    </div>
  );
}

export default SentRequestCard;
