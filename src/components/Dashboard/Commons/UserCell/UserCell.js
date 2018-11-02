
import React from 'react';
import './UserCell.css';
import DefaultPic from '../../../../resources/profile.svg';

const UserCell = (props) => {
  return(
    <div className={props.customClass} onClick={props.onClick} >
      <div className="userCell-picture">
        <div className='userCell-picture--img' style={{backgroundImage: `url(${props.user.pictureUrl && props.user.pictureUrl !== "" ? props.user.pictureUrl : DefaultPic})`}}></div>
        {/* <img alt="" src={props.user.pictureUrl && props.user.pictureUrl !== "" ? props.user.pictureUrl : DefaultPic} /> */}
      </div>
      <div className="userCell-name">
     {props.user.firstName + " " + props.user.lastName}
      </div>
      {props.accessory}
    </div>
  );

};

export default UserCell;
