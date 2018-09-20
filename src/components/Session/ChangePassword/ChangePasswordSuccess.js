import React from 'react';
import './ChangePassword.css';
import UpdateImage from '../../../resources/updated.svg';

const ChangePasswordSuccess=(props) => {
  return(
    <div className="change-password-container">
      <div className="overlay" onClick={ props.handleCloseAlert.bind(this, false)}>
      </div>
      <div className="change-password-alert">
        <div className="change-password-succees">
          <img alt="" src={UpdateImage}></img>
          <div className="change-password-success-title">Your password is updated!</div>
        </div>
      </div>
    </div>
  );

};

export default ChangePasswordSuccess;
