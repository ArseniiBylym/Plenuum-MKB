import React from 'react';
import './SetPasswordConfirmation.css';
import { NavLink } from 'react-router-dom';
import LogoNavigationBar from '../../../Dashboard/Commons/DefaultNavigationBar/LogoNavigationBar.js'
import UpdateImage from '../../../../resources/updated.svg';

const SetPasswordConfirmation = (props) => {

  return(
    <div className="parentcontainer">
      <LogoNavigationBar />
      <div className="set-password-confirmation-main-container">
        <div className="set-password-confirmation-form">
          <div className="set-password-confirmation-form-div">
            <div className="set-password-confirmation-title">
              {props.title}
            </div>
            {props.image ?
              <div className="set-password-confirmation-image">
                {props.image}
              </div>
              :
              undefined
            }
            {props.message}
            { props.button ?
              props.button :
              <NavLink to="/login" className="set-password-confirmation-link">{props.buttonMessage}</NavLink>
            }
          </div>
        </div>
      </div>
    </div>
  );
};


export const TokenHasExpired = (props) => {
  return(
    <div className="parentcontainer">
      <LogoNavigationBar />
      <div className="set-password-confirmation-main-container">
        <div className="set-password-confirmation-form">
          <div className="set-password-confirmation-form-div">
            <div className="set-password-confirmation-image">
              <img alt="" src={props.image}></img>
            </div>
            <p className="set-password-confirmation-title">{props.message}</p>
            { props.reseted ?
              undefined :
              <p className="resend-link" onClick={props.resendLink}>Resend link</p>
            }
            <NavLink to="login" className="set-password-confirmation-link">Vissza a bejelentkezéshez</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export const createComponent = (location) => {
    if (location.pathname === '/set_password_confirmation/success') {
        if (location.state && location.state.message === 'NOTDESKTOP') {
            return {
                message: <p className="set-password-confirmation-message">Plenuum for web is optimized for desktop usage. To access Plenuum, get the iOS app or open <a href='app.plenuum.com'>app.plenuum.com</a> in a desktop browser.</p>,
                title: 'Your account is ready to use',
                image: undefined,
                button: <a className='plenuum-app-store' href='https://itunes.apple.com/hu/app/plenuum-earlybird/id1180931406'>Get Plenuum for IOS</a>
            }
        }else{
            return {
                message: location.state ? <p className="set-password-confirmation-message">{location.state.message}</p> : <p className="set-password-confirmation-message">Your password was successfully changed!</p>,
                title: location.state ? 'One moment please' :'Success',
                image: (<img alt='' src={UpdateImage} />),
                button: undefined,
                buttonMessage: location.state ? 'Not logged in automatically? Vissza a bejelentkezéshez' : 'Vissza a bejelentkezéshez'
            }
        }
    }else{
        return {
            message: <p className="set-password-confirmation-message">Ajjaj, valami elromlott! Próbáld újra</p>,
            title: 'Oopps',
            image: undefined,
            button: undefined
        }
    }
};

export default SetPasswordConfirmation;
