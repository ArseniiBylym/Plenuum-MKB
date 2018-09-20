import React from 'react';
import './ResetPassword.css';
import { NavLink } from 'react-router-dom';
import LogoNavigationBar from '../../Dashboard/Commons/DefaultNavigationBar/LogoNavigationBar.js'

const ResetPassword=(props) => {

  return(
    <div className="parentcontainer">
      <LogoNavigationBar />
      <div className="reset-password-main-container">
        <div className="reset-password-container-form">
          <div className="reset-password-container-form-div">
            <div className="reset-password-title-container">
              <p className="reset-password-title">Forgot your password?</p>
              <p className="reset-password-subtitle">Enter your email address to reset your password. You may need to check your spam folder.</p>
            </div>
            <p className="reset-password-email-label">EMAIL ADDRESS</p>
            <input type="text" name="reset-email" ref={props.getRefEmail} onChange={props.handleChangeEmail}/>
              <div className="reset-password-button-div">
                <NavLink className="reset-password-back-login"
                  to="/login"
                  >Back to login</NavLink>
                <div className="reset-password-button" onClick={props.resetPassword}>
                  <p>Reset my password</p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default ResetPassword;
