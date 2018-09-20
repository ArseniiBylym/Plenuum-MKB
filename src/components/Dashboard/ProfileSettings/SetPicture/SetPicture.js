import React from 'react';
import './SetPicture.css';
import Dropzone from 'react-dropzone';
import UpdateImage from '../../../../resources/updated.svg';
const acceptedFiles = "image/jpeg, image/png, image/gif";
const maxSize = 1000000; //In bytes
const multipleFiles = false;

const SetPicture = (props, context) => {
  return (
    <div className="dropzone">
      <div className="overlay-setpicture" onClick={ props.handlePictureChange}></div>
      <div className="dropzone-container">
        <div className="setpicture-title">
          <p>Set your profile picture</p>
        </div>
        <Dropzone
            className='dropzone-lib' activeStyle={{borderColor: '#35a9db'}}
            onDrop={props.onDrop} accept={acceptedFiles} multiple={multipleFiles}
            maxSize={maxSize}
        >
          {props.image}
          <p>Drop an image here or click to upload one.</p>
        </Dropzone>
        <div className={props.buttonClass} onClick={ props.submitPicture }>
          <p>Set my profile picture</p>
        </div>
      </div>
    </div>
  )

};

export const SetPictureState = (props, context) => {
  return (
    <div className="dropzone">
      <div className="overlay-setpicture" onClick={ props.handlePictureChange }></div>
      <div className="dropzone-container">
        {props.component}
      </div>
    </div>
  );
};

export const setPictureSuccess = () => {
  return (
      <div className="setpicture-succees">
          <img alt="" src={UpdateImage}></img>
          <div className="setpicture-success-title">Your profile picture is updated!</div>
      </div>
  );
};

export default SetPicture;
