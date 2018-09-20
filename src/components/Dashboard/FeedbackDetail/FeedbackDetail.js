import React from 'react';
import './FeedbackDetail.css';
import Quotation from '../../../resources/quotation.svg';
import DefaultPic from '../../../resources/profile.svg';

const FeedbackDetail = (props) => {

  return (
      <div className="feedback-detail-super-container container-fluid">
          <div className="feedback-detail-top row">
              {props.feedback.total}
              <div className="col-sm-2 close-conntainer">
                  <a className='pull-right' onClick={props.close}>
                      <i className='fa fa-times close-detail'></i>
                  </a>
              </div>
          </div>
          <div className="feedback-detail-main-container margin-top-2 row">
              <div className="col-sm-2 previous-next-container">
                  {props.feedback.prev}
              </div>
              <div className="feedback-detail-center">
                  <div className="feedback-detail-content">
                      <div className="feedback-detail-identification">
                          <div className="feedback-detail-identification-user">
                              <img alt="" src={props.feedback.userPic && props.feedback.userPic != ""? props.feedback.userPic : DefaultPic}/>
                              <p>{props.feedback.username}</p>
                          </div>
                          <div className="feedback-detail-createdAt">
                              {props.feedback.createdAt}
                          </div>
                      </div>
                      <div className="feedback-detail-name-and-request">
                          {props.feedback.request}
                      </div>
                      <div className="feedback-detail-messages">
                          <div className="feedback-detail-message">
                              {props.feedback.message}
                          </div>
                          {props.feedback.tags}
                      </div>
                      <hr className='divider'/>
                      <div className="small-card">
                          <div className={props.feedback.typeClassName}>
                              <img alt="" className='small-image' src={props.feedback.typeIcon} />
                          </div>
                          <div className="text-card">
                              {props.feedback.typeMessage}
                          </div>
                      </div>
                      <div className="small-card">
                          {props.feedback.sentAs}
                      </div>
                  </div>
              </div>
              <div className="col-sm-2 next-next-container">
                  {props.feedback.next}
              </div>
          </div>
      </div>
  );
};

export const sentAsComponent = (props) => {
    return (
        <div className="feedback-detail-sentAs">
          <img alt="" className='small-image'
               src={props.imageSrc && props.imageSrc != ""? props.imageSrc : DefaultPic}/>
          <div className="text-card">
              {props.text}
          </div>
        </div>
    );
};

export const previousButton = (props) => {
  return (
      <a onClick={props.previousFeedback}>
          <i className='fa fa-chevron-left'></i>
      </a>
  );
};

export const nextButton = (props) => {
  return (<a onClick={props.nextFeedback}>
    <i className='fa fa-chevron-right'></i>
  </a>);
};

export const totalCounter = (props) => {
    let total = (<div className="feedback-detail-counter"></div>);
    if (props.type === 2) {
        total = (
            <div className="feedback-detail-counter">
              <p>{props.count}</p>
            </div>
        )
    }
    return total;
};

export const request = (props) => {
    return (
        <div className="feedback-detail-request">
            <img alt="" src={Quotation}/>
            <p>{props.requestMessage}</p>
        </div>
    );
};
export default FeedbackDetail;
