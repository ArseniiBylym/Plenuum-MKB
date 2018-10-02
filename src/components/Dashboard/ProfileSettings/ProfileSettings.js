import React from 'react';
import './ProfileSettings.css';
import DefaultPic from '../../../resources/profile.svg';
import CameraIcon from '../../../resources/camera-with-bg.svg';
import { NavLink } from 'react-router-dom'
import PlusIcon from '../../../resources/ic_add_black_24dp_1x.png';
import CloseIcon from '../../../resources/ic-close-black.svg';
import SurveyFormContainer from '../SurveyConteiner/SurveyContainer'
import ProfileManegerForm from './ProfileManagerForm/ProfileManagerForm';


const ProfileSettings = (props) => {
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
                  props.user.pictureUrl ? props.user.pictureUrl + '?' + (new Date()).getTime() : DefaultPic
                }
              />
              <img className="default-camera" alt="default camera" src={CameraIcon} />
            </div>
            <div className="settings-user-content">
              <p>{props.user.firstName + " " + props.user.lastName}</p>
              <p className="user-description">{props.userDescription}</p>
            </div>
          </div>
        </div>
        <hr className='user-data-divider' />
        <div className="section-header">
          <div className="section-header-title">PERSONAL</div>
          {props.actions}
        </div>
        <div className="settings-form-information">


         


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
          <div className="settings-data manager-select">
            <label>
              Line manager
                </label>
                <ProfileManegerForm />
          </div>
         
        </div>
        <hr className='user-data-divider' />
        <div className="section-header">
          <div className="section-header-title">SECURITY</div>
        </div>
        <div className="settings-form-information">
          <div className="settings-data">
            <label>
              Password
                </label>
            <input
              className="edit-password"
              name="password"
              value="Reset my password"
              type="button"
              onClick={props.handleChangePassword.bind(this, true)}
            />
          </div>
        </div>
      </div>
    </div>
  )
};

export const editSaveActions = (props) => {
  return (
    <div className="settings-user-actions" >
      <p onClick={props.handleEdition}>Cancel</p>
      <p onClick={props.handleSave}>Save</p>
    </div>
  );
};

export const editActions = (props) => {
  return (
    <div className="settings-user-actions">
      <p onClick={props.handleEdition}>Edit</p>
    </div>
  );
};

export default ProfileSettings;


// <div className="settings-data">
// <label>
//   First Name
// </label>
// <input
//     readOnly={props.readOnly}
//     name="firstName"
//     type="text"
//     defaultValue={props.user.firstName}
// />
// </div>
// <div className="settings-data">
// <label>
//   Last Name
// </label>
// <input
//     readOnly={props.readOnly}
//     name="lastName"
//     type="text"
//     defaultValue={props.user.lastName}
// />
//         </div>