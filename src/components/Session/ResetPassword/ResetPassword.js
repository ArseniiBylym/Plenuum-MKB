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
              <p className="reset-password-title">Elfelejtetted a jelszavad?</p>
              <p className="reset-password-subtitle">Add meg az email címed a jelszó visszaállításához. Előfordulhat, hogy a levél a spam mappába kerül.</p>
            </div>
            <p className="reset-password-email-label">EMAIL CÍM</p>
            <input type="text" name="reset-email" ref={props.getRefEmail} onChange={props.handleChangeEmail}/>
              <div className="reset-password-button-div">
                <NavLink className="reset-password-back-login"
                  to="/login"
                  >Vissza a bejelentkezéshez</NavLink>
                <div className="reset-password-button" onClick={props.resetPassword}>
                  <p>Elfelejtetted a jelszavad?</p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default ResetPassword;
