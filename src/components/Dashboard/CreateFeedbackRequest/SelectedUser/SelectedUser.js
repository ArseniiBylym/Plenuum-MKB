import React from 'react';
import './SelectedUser.css';
import DefaultPic from '../../../../resources/profile.svg';

//TODO: Check if this is really necessary, this class is difers from UserCell just by the css

const SelectedUser = (props) => {
  return(
    <div className="main-container-selectedUser">
      <div className="selectedUser-picture">
        <img alt="" src={props.user.pictureUrl || DefaultPic} />
      </div>
      <div className="selectedUser-name">
        <p>{props.user.firstName}</p>
      </div>
      <div className="close-icon">
        <a onClick={props.onClick}>
          <i className='fa fa-times'></i>
        </a>
      </div>

    </div>
  );
};

export default SelectedUser;
