import React from 'react';
import './ResetConfirmation.css';
import { NavLink } from 'react-router-dom';
import MailImage from '../../../../resources/mailbox.png';
import LogoNavigationBar from '../../../Dashboard/Commons/DefaultNavigationBar/LogoNavigationBar.js'

const ResetConfirmation = (props) => {

  return(
    <div className="parentcontainer">
      <LogoNavigationBar />
      <div className="reset-confirmation-main-container">
        <div className="reset-confirmation-form">
          <div className="reset-confirmation-form-div">
            <div className="reset-confirmation-image">
              <img alt="" src={MailImage}></img>
            </div>
            <p className="reset-confirmation-title">Check your mailbox!</p>
            <NavLink to="/login" className="reset-confirmation-link">Back to Login</NavLink>
          </div>
        </div>
      </div>
    </div>
  );

}

export default ResetConfirmation;
