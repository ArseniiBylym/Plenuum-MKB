import React from 'react';
import './SetPassword.css';
import LogoNavigationBar from '../../Dashboard/Commons/DefaultNavigationBar/LogoNavigationBar.js'

const SetPassword = (props) => {

  return(
    <div className="parentcontainer">
      <LogoNavigationBar />
      <div className="set-password-main-container">
        <div className="set-password-form-container">
          <div className="set-password-form-div">
            <div className="set-password-title-container">
              {props.title}
              {props.message}
            </div>
            <p className="set-password-label">NEW PASSWORD</p>
            <input type="password" name="newpassword" onChange={props.handleChange}/>
            <p className="set-password-label">CONFIRM PASSWORD</p>
            <input type="password" name="passwordagain" onChange={props.handleChange}/>
            <div className="set-password-button-div">
              <div className="set-password-button" onClick={props.setPassword}>
                <p>{props.buttonTitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export const createComponent = (object) => {
    let title, message, buttonTitle;
    if (object.welcome) {
        title=(<p className="set-password-title">{"Welcome to Plenuum, " + object.userName}</p>);
        message=(<p className="set-password-subtitle">Set password for <strong>{object.email}</strong> to start</p>);
        buttonTitle="Set password & log in"
    }else{
        title=(<p className="set-password-title">{"Set your new password"}</p>);
        message=<p className="set-password-subtitle">{"Set your new password for the account " + object.email}</p>;
        buttonTitle="Set password"
    }

    return { title, message, buttonTitle }
};

export default SetPassword;
