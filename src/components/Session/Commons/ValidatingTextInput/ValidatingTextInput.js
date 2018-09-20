import React from 'react';
import './ValidatingTextInput.css';

const ValidatingTextInput = (props) => {
    const className = " " + props.errorClass || "";
  return(
        <div key={"id" + props.name} className={"change-password" + className}>
          <label className="title">{props.label}</label> <span className="error-message">{" " + props.errorMessage}</span>
          <input type={props.type || "text"} name={props.name} id="currentPassword" onFocus={props.onFocus} onBlur={props.onBlur} onChange={props.onChange}/>
        </div>
  );

};

export default ValidatingTextInput;
