import React from 'react';
import './ProfileSettings.css';
import DefaultPic from '../../../resources/profile.svg';
import CameraIcon from '../../../resources/camera-with-bg.svg';

const ProfileSettings=(props) => {
    return (
        <div className="settings-main-container">
            {props.dropzone}
            {props.changePassword}
          <div className="profile-main-container">
            <div className="settings-user-header">
              <div className="settings-user-data">
                <div className="settings-avatar" onClick={props.setPic}>
                    <img alt=""
                         src={
                             props.user.pictureUrl ? props.user.pictureUrl+ '?' + (new Date()).getTime() : DefaultPic
                         }
                    />
                    <img className="default-camera" alt="default camera"  src={CameraIcon} />
                </div>
                <div className="settings-user-content">
                  <p>{props.user.firstName + " " + props.user.lastName}</p>
                  <p className="user-description">{props.userDescription}</p>
                </div>
              </div>
            </div>
            <hr className='user-data-divider'/>
            <div className="section-header">
              <div className="section-header-title">SZEMÉLYES</div>
                {props.actions}
            </div>
            <div className="settings-form-information">

              <div className="settings-data">
                <label>
                Keresztnév
                </label>
                <input
                    readOnly={props.readOnly}
                    name="firstName"
                    type="text"
                    defaultValue={props.user.firstName}
                />
              </div>
              <div className="settings-data">
                <label>
                Vezetéknév
                </label>
                <input
                    readOnly={props.readOnly}
                    name="lastName"
                    type="text"
                    defaultValue={props.user.lastName}
                />
              </div>
              <div className="settings-data">
                <label>
                  Email
                </label>
                  {/*  TODO: must be not a div but textarea for editing*/}
                <input
                    readOnly={props.readOnly}
                    name="email"
                    type="text"
                    defaultValue={props.user.email}
                />
              </div>
            </div>
            <hr className='user-data-divider'/>
            <div className="section-header">
              <div className="section-header-title">BIZTONSÁG</div>
            </div>
            <div className="settings-form-information">
              <div className="settings-data">
                <label>
                Jelszó
                </label>
                <input
                    className="edit-password"
                    name="password"
                    value="Jelszó visszaállítása"
                    type="button"
                    onClick={props.handleChangePassword.bind(this, true)}
                />
              </div>
            </div>
          </div>
        </div>
    )
};

export const editSaveActions=(props) => {
    return (
        <div className="settings-user-actions" >
          <p onClick={props.handleEdition}>Mégse</p>
          <p onClick={props.handleSave}>Save</p>
        </div>
    );
};

export const editActions=(props) => {
    return (
        <div className="settings-user-actions">
          <p onClick={props.handleEdition}>Szerk.</p>
        </div>
    );
};

export default ProfileSettings;
