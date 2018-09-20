import React from 'react';
import './RequestCard.css';
import { NavLink } from 'react-router-dom';
import DefaultPic from '../../../../resources/profile.svg';

const RequestCard = (props) => {
  return (
    <div className="request-container" key={props.key}>
      <div className="request-user">
        <img alt="" src={props.user.pictureUrl && props.user.pictureUrl !== "" ? props.user.pictureUrl : DefaultPic} />
        <p>{props.user.firstName + " " + props.user.lastName}</p>
      </div>
      <div className="request-message">
        <p>{props.request.requestMessage}</p>
      </div>
      <NavLink
        className="request-link-feedback"
        to={{
          pathname: props.linkProperties.pathname,
          state: props.linkProperties.state
        }}
        >
        Give feedback
      </NavLink>
    </div>
  );
};

export default RequestCard;
