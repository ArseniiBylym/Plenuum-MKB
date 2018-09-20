import React from 'react';
import './ProfileCard.css';
import ProfileDefaultPic from '../../../resources/profile.svg';

const ProfileCard=(props) => {
  return(
    <div className="profile-content">
      <div className="avatar">
          <img
            className="profile-picture"
            alt=""
            src={
              props.pictureUrl !== "" && props.pictureUrl ? props.pictureUrl + '?' + (new Date()).getTime() : ProfileDefaultPic} 
          />
          <div className="profile-name" onClick={props.menuClicked}>
            <div className="name">{props.firstName + " " + props.lastName}</div>
            <div className={props.chevron}></div>
          </div>
      </div>
        <div className="profile-options">
            {props.menu}
        </div>
    </div>
  )
}

export default ProfileCard
