import React from 'react';
import './RequestCard.css';
import { NavLink } from 'react-router-dom';
import DefaultPic from '../../../../resources/profile.svg';
import moment from 'moment';

const RequestCard = (props) => {
  // console.log(props)
  return (
    <div className="request-container" key={props.key}>
      <div className="request-user">
        <div className='picture-wrapper'>
          <div className='picture-wrapper--img' style={{backgroundImage: `url(${props.user.pictureUrl && props.user.pictureUrl !== "" ? props.user.pictureUrl : DefaultPic})`}}></div>
          <img alt="" src={props.user.pictureUrl && props.user.pictureUrl !== "" ? props.user.pictureUrl : DefaultPic} />
        </div>
        <p>{props.user.firstName + " " + props.user.lastName}</p>
      </div>
      <div className="request-message">
        <p>{props.request.requestMessage}</p>
      </div>
      <div className='feedback-content-date interact-card'>
						{moment(props.request.createdAt).format('YYYY.MM.DD • HH.mm')}
				</div>
      <NavLink
        className="request-link-feedback"
        to={{
          pathname: props.linkProperties.pathname,
          state: props.linkProperties.state
        }}
        >
        Visszajelzés küldése
      </NavLink>
    </div>
  );
};

export default RequestCard;
